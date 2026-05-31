# AGENTS.md

## Cursor Cloud specific instructions

### Repository layout

- **`main`** may only contain a stub README. The full **Punto de Sabor** app (Next.js 14 PWA) lives on remote branches; the recommended branch for local dev without Supabase is **`origin/cursor/build-punto-de-sabor-app-a3c4`** (sample-data fallback in `lib/data.ts`).
- Other implementation branches exist under `origin/cursor/punto-de-sabor-app-*` if you need alternate features (e.g. API routes on `77e4`).

### Single service: Next.js

| Task | Command |
| --- | --- |
| Install deps | `npm install` (requires `package.json` on the checked-out branch) |
| Dev server | `npm run dev` → http://localhost:3000 |
| Lint | `npm run lint` |
| Typecheck | `npm run typecheck` |
| Production build | `npm run build` then `npm run start` |

There is **no** automated test script (`npm test` does not exist).

### Environment

- Copy `.env.example` → `.env.local`.
- **Sample-data mode (no Supabase):** leave `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` unset (or commented). Set `NEXT_PUBLIC_WHATSAPP_NUMBER` (digits only).
- **Full E2E (real menu + persisted orders):** set Supabase URL/anon key, run `supabase/schema.sql` and `supabase/seed.sql` in the Supabase SQL Editor. Do not commit `.env.local` (gitignored).

### Running the dev server

Use a **tmux** session so the server survives backgrounding, e.g. session name `next-dev-server`:

```bash
tmux -f /exec-daemon/tmux.portal.conf new-session -d -s next-dev-server -c /workspace -- npm run dev
```

### Optional external services

| Service | Required? | Notes |
| --- | --- | --- |
| Next.js (`:3000`) | Yes | All UI and data fetching |
| Supabase (hosted) | Only for real DB/orders | Not needed for menu/cart UI with sample data |
| WhatsApp (`wa.me`) | Optional locally | Opens in browser on checkout; no local daemon |

### Gotchas

- If `.env.local` still has placeholder Supabase values from `.env.example`, the app will try (and fail) remote fetches during `next build` before falling back to sample data—omit those vars for cleaner local logs.
- After `npm install`, restart `npm run dev` if the dev server was already running; Next does not always pick up new packages without a restart.

See `README.md` on an implementation branch for product details and Vercel deployment.
