// Generates simple branded PNG icons (orange background with white "P").
// Run once: `node scripts/gen-icons.mjs`
import { writeFileSync } from 'node:fs';
import { deflateSync } from 'node:zlib';

const OUT = new URL('../public/', import.meta.url);

const BG = [0xf2, 0x5a, 0x18]; // brand-500
const FG = [0xff, 0xf8, 0xf1]; // cream

function makeIcon(size, { maskable = false } = {}) {
  // RGBA pixel buffer
  const channels = 4;
  const px = Buffer.alloc(size * size * channels);
  const radius = maskable ? size * 0.5 : size * 0.22; // maskable = full bleed circle-ish via padding
  const cx = size / 2;
  const cy = size / 2;
  const cornerR = size * 0.22;

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const inside = maskable
        ? Math.hypot(x - cx, y - cy) <= radius
        : insideRoundedSquare(x, y, size, cornerR);

      const i = (y * size + x) * channels;
      if (inside) {
        px[i] = BG[0]; px[i + 1] = BG[1]; px[i + 2] = BG[2]; px[i + 3] = 255;
      } else {
        px[i + 3] = 0;
      }
    }
  }

  // Draw a stylized "P" using simple rectangles in cream.
  drawLetterP(px, size);

  return encodePNG(px, size, size);
}

function insideRoundedSquare(x, y, size, r) {
  if (x >= r && x < size - r) return y >= 0 && y < size;
  if (y >= r && y < size - r) return x >= 0 && x < size;
  // corners
  const corners = [
    [r, r], [size - r, r], [r, size - r], [size - r, size - r],
  ];
  for (const [cx, cy] of corners) {
    if (
      (x < cx) === (cx === r) &&
      (y < cy) === (cy === r) &&
      Math.hypot(x - cx, y - cy) <= r
    ) {
      return true;
    }
  }
  return false;
}

function drawLetterP(px, size) {
  // Build a simple P shape: vertical stem + top loop.
  const stemW = Math.round(size * 0.13);
  const stemH = Math.round(size * 0.55);
  const stemX = Math.round(size * 0.30);
  const stemY = Math.round(size * 0.22);

  fillRect(px, size, stemX, stemY, stemW, stemH, FG);

  // Loop (outer)
  const loopX = stemX;
  const loopY = stemY;
  const loopW = Math.round(size * 0.36);
  const loopH = Math.round(size * 0.30);
  fillRoundedRect(px, size, loopX, loopY, loopW, loopH, Math.round(loopH / 2), FG);

  // Loop (inner cut)
  const innerW = Math.round(loopW * 0.40);
  const innerH = Math.round(loopH * 0.45);
  const innerX = loopX + stemW + Math.round((loopW - stemW - innerW) / 2);
  const innerY = loopY + Math.round((loopH - innerH) / 2);
  fillRoundedRect(px, size, innerX, innerY, innerW, innerH, Math.round(innerH / 2), BG);
}

function fillRect(px, size, x, y, w, h, color) {
  for (let yy = y; yy < y + h; yy++) {
    for (let xx = x; xx < x + w; xx++) {
      if (xx < 0 || yy < 0 || xx >= size || yy >= size) continue;
      const i = (yy * size + xx) * 4;
      if (px[i + 3] === 0) continue; // only paint over background
      px[i] = color[0]; px[i + 1] = color[1]; px[i + 2] = color[2]; px[i + 3] = 255;
    }
  }
}

function fillRoundedRect(px, size, x, y, w, h, r, color) {
  for (let yy = y; yy < y + h; yy++) {
    for (let xx = x; xx < x + w; xx++) {
      if (xx < 0 || yy < 0 || xx >= size || yy >= size) continue;
      // rounded corner test
      const dx = xx < x + r ? x + r - xx : xx >= x + w - r ? xx - (x + w - r - 1) : 0;
      const dy = yy < y + r ? y + r - yy : yy >= y + h - r ? yy - (y + h - r - 1) : 0;
      if (dx * dx + dy * dy > r * r) continue;
      const i = (yy * size + xx) * 4;
      if (px[i + 3] === 0) continue;
      px[i] = color[0]; px[i + 1] = color[1]; px[i + 2] = color[2]; px[i + 3] = 255;
    }
  }
}

// Minimal PNG encoder (8-bit RGBA, no interlace)
function encodePNG(pixels, width, height) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;   // bit depth
  ihdr[9] = 6;   // color type RGBA
  ihdr[10] = 0;  // compression
  ihdr[11] = 0;  // filter
  ihdr[12] = 0;  // interlace

  // Add filter byte (0) per scanline
  const raw = Buffer.alloc(height * (1 + width * 4));
  for (let y = 0; y < height; y++) {
    raw[y * (1 + width * 4)] = 0;
    pixels.copy(raw, y * (1 + width * 4) + 1, y * width * 4, (y + 1) * width * 4);
  }
  const idat = deflateSync(raw);

  return Buffer.concat([
    sig,
    makeChunk('IHDR', ihdr),
    makeChunk('IDAT', idat),
    makeChunk('IEND', Buffer.alloc(0)),
  ]);
}

function makeChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length, 0);
  const typeBuf = Buffer.from(type, 'ascii');
  const crc = Buffer.alloc(4);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
  return Buffer.concat([len, typeBuf, data, crc]);
}

const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) {
    let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0;
  }
  return t;
})();
function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function writeIcon(name, size, opts) {
  const buf = makeIcon(size, opts);
  writeFileSync(new URL(name, OUT), buf);
  console.log(`✓ ${name} (${size}×${size}, ${buf.length} bytes)`);
}

writeIcon('icon-192.png', 192);
writeIcon('icon-512.png', 512);
writeIcon('icon-maskable-512.png', 512, { maskable: true });
writeIcon('apple-touch-icon.png', 180);
