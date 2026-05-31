# Punto de Sabor

Aplicacion web customer-facing para restaurante/food business construida con Next.js 14, TypeScript, Supabase y Tailwind CSS. La UI esta en espanol por defecto, es mobile-first, instalable como PWA y permite crear pedidos con carrito, guardarlos en Supabase y confirmarlos por WhatsApp.

## Estructura

```txt
app/
  api/orders/route.ts        # Guarda pedidos en Supabase
  carrito/page.tsx           # Carrito + checkout
  pagina/page.tsx            # Nuestra Pagina desde business_info
  layout.tsx                 # Shell, PWA, navegacion y providers
  page.tsx                   # Menu agrupado por categoria
components/                  # UI, carrito, checkout y navegacion
lib/
  config.ts                  # Variables publicas y formato de moneda
  data.ts                    # Queries tipadas a Supabase
  supabase.ts                # Cliente Supabase tipado
  types.ts                   # Tipos de tablas
  whatsapp.ts                # Mensajes y wa.me links
public/
  icon.svg
  sw.js                      # Service worker simple para PWA
supabase/
  schema.sql                 # Tablas, RLS, storage bucket y policies
  seed.sql                   # Info del negocio y 10 items de ejemplo
```

## Configuracion local

1. Instala dependencias:

   ```bash
   npm install
   ```

2. Copia variables de entorno:

   ```bash
   cp .env.example .env.local
   ```

3. Completa `.env.local`:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
   NEXT_PUBLIC_WHATSAPP_NUMBER=5215555555555
   NEXT_PUBLIC_DELIVERY_FEE=35
   NEXT_PUBLIC_MIN_ORDER_AMOUNT=150
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. En Supabase SQL Editor ejecuta:

   - `supabase/schema.sql`
   - `supabase/seed.sql`

5. Inicia el proyecto:

   ```bash
   npm run dev
   ```

## Supabase

Tablas principales:

- `menu_items`: categoria, nombre, descripcion, precio, imagen, disponibilidad y orden.
- `business_info`: descripcion del negocio, horarios, direccion, mapa, telefono y redes.
- `orders`: datos del cliente, tipo de entrega, items, subtotal, envio, total y estado.

El schema tambien crea el bucket publico `menu-images` para guardar fotos del menu en Supabase Storage. Los datos seed usan imagenes externas para que puedas probar inmediatamente; puedes reemplazar `image_url` por URLs publicas del bucket.

## Scripts

```bash
npm run dev
npm run lint
npm run typecheck
npm run build
```
