# Punto de Sabor

Aplicacion web customer-facing para restaurante, construida con Next.js 14, TypeScript, Supabase y Tailwind CSS. Incluye menu digital, carrito, checkout con domicilio/recogida, guardado de pedidos en Supabase y confirmacion por WhatsApp.

## Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Supabase (Postgres + Storage)
- PWA lista para Vercel

## Estructura principal

```text
app/
  api/orders/route.ts      # Guarda pedidos en Supabase
  layout.tsx               # Layout global, nav inferior, PWA metadata
  manifest.ts              # Manifest de la app instalable
  menu/page.tsx            # Menu por categorias
  pagina/page.tsx          # Nuestra Pagina / about
  pedidos/page.tsx         # Carrito + checkout
components/
  bottom-nav.tsx
  business-page-content.tsx
  cart-page-content.tsx
  cart-quick-bar.tsx
  floating-whatsapp-button.tsx
  menu-item-card.tsx
  menu-page-content.tsx
lib/
  cart-context.tsx         # Estado global del carrito
  config.ts                # Variables de entorno publicas/servidor
  data.ts                  # Queries tipadas de Supabase
  format.ts                # Formato de moneda
  supabase.ts              # Clientes tipados de Supabase
  whatsapp.ts              # Construccion de mensaje/link de WhatsApp
sql/
  schema.sql               # Tablas, RLS, bucket y politicas
  seed.sql                 # Datos de prueba del negocio y menu
types/
  app.ts
  database.ts
```

## Variables de entorno

Copia `.env.example` a `.env.local`:

```bash
cp .env.example .env.local
```

Variables requeridas:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `NEXT_PUBLIC_DELIVERY_FEE`
- `NEXT_PUBLIC_MIN_ORDER_AMOUNT`

Variables opcionales:

- `NEXT_PUBLIC_CURRENCY_CODE` (por defecto `USD`)
- `NEXT_PUBLIC_LOCALE` (por defecto `es-CO`)

## Configurar Supabase

1. Crea un proyecto en Supabase.
2. Ejecuta `sql/schema.sql`.
3. Ejecuta `sql/seed.sql`.
4. En Storage, el bucket `menu-images` quedara creado por el schema.
5. Si subes imagenes al bucket, usa sus URLs publicas en `menu_items.image_url`.

## Desarrollo local

```bash
npm install
npm run dev
```

Abrira la app en `http://localhost:3000/menu`.

## Flujo de pedidos

1. El cliente navega el menu por categorias.
2. Agrega productos disponibles al carrito.
3. En `/pedidos`, ajusta cantidades y elige `Domicilio` o `Recoger`.
4. Al confirmar:
   - se inserta el pedido en `orders`
   - se genera un mensaje prellenado de WhatsApp
   - se abre `wa.me` para confirmar con el negocio

## Despliegue en Vercel

1. Importa el repositorio en Vercel.
2. Agrega todas las variables de entorno del `.env.example`.
3. Despliega.

## Notas

- Las lecturas del menu y la pagina del negocio usan queries tipadas de Supabase.
- La app muestra estados vacios y de configuracion si faltan datos.
- El menu se alimenta desde Supabase, asi que puedes editar productos, horarios o redes sin redeploy.
