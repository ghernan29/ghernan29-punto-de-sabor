# Punto de Sabor

Web app para una cocina/restaurante mexicano. Permite a los clientes ver el menú,
armar un carrito y enviar el pedido directamente por WhatsApp al negocio. Diseñada
mobile-first, instalable como PWA, con UI en español.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Supabase** (Postgres + Storage para fotos del menú)
- **Tailwind CSS**
- **PWA** (manifest + iconos)
- Lista para desplegar en **Vercel**

## Estructura

```
.
├── app/
│   ├── layout.tsx           # layout raíz (header, bottom nav, FAB WhatsApp)
│   ├── page.tsx             # /  → Menú
│   ├── _menu/MenuView.tsx   # vista de menú con filtro por categoría
│   ├── carrito/             # /carrito → carrito + checkout
│   │   ├── page.tsx
│   │   └── CartPageClient.tsx
│   ├── pagina/page.tsx      # /pagina → info del negocio
│   ├── loading.tsx
│   ├── not-found.tsx
│   └── globals.css
├── components/
│   ├── BottomNav.tsx        # nav inferior móvil (Menú · Pedido · Página · WhatsApp)
│   ├── SiteHeader.tsx       # header desktop/mobile
│   ├── CartProvider.tsx     # estado del carrito (Context + localStorage)
│   ├── CategoryChips.tsx
│   ├── MenuItemCard.tsx
│   ├── WhatsAppFab.tsx      # botón flotante de WhatsApp
│   ├── Loading.tsx
│   └── Empty.tsx
├── lib/
│   ├── supabase.ts          # cliente tipado de Supabase
│   ├── types.ts             # tipos compartidos + Database
│   ├── config.ts            # lectura de NEXT_PUBLIC_*
│   ├── format.ts            # formato de precios
│   └── whatsapp.ts          # construcción del mensaje y wa.me link
├── supabase/
│   ├── schema.sql           # tablas, índices, RLS
│   └── seed.sql             # categorías, ~10 platillos y business_info
├── public/
│   ├── manifest.webmanifest
│   ├── icon.svg
│   ├── icon-192.png
│   ├── icon-512.png
│   ├── icon-maskable-512.png
│   └── apple-touch-icon.png
└── scripts/
    └── gen-icons.mjs        # regenerar PNGs del PWA
```

## Configuración rápida

### 1. Variables de entorno

Copia `.env.example` → `.env.local` y rellena los valores:

```bash
cp .env.example .env.local
```

| Variable | Descripción |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | URL del proyecto Supabase |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon key (RLS protege la escritura) |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número en formato internacional, solo dígitos. Ej: `5215512345678` |
| `NEXT_PUBLIC_DELIVERY_FEE` | Costo de envío fijo (fallback si no hay `business_info`) |
| `NEXT_PUBLIC_MIN_ORDER` | Pedido mínimo |
| `NEXT_PUBLIC_CURRENCY` | Código de moneda (`MXN`, `USD`, …) |
| `NEXT_PUBLIC_LOCALE` | Locale para formatear precios (`es-MX`) |
| `NEXT_PUBLIC_BUSINESS_NAME` | Nombre mostrado en header/title |

> El `delivery_fee`, `min_order`, `currency` y `whatsapp_number` también se leen
> de la tabla `business_info` (id = 1) y tienen prioridad sobre las variables de
> entorno. Esto permite que el negocio edite estos valores sin redeploy.

### 2. Base de datos

En el SQL editor de Supabase ejecuta, en orden:

1. `supabase/schema.sql` — crea las tablas `categories`, `menu_items`,
   `business_info`, `orders`, los tipos enum, índices y políticas RLS.
2. `supabase/seed.sql` — inserta categorías, ~10 platillos de ejemplo y la
   información del negocio.

Crea también un bucket público de Storage llamado `menu` si quieres subir tus
propias fotos y enlazarlas en `menu_items.image_url`.

### 3. Instalar y correr

```bash
npm install
npm run dev          # http://localhost:3000
npm run typecheck    # validación TS
npm run build        # build de producción
```

## Cómo funciona el pedido

1. El cliente arma su carrito desde `/` (Menú). Las cantidades se guardan en
   `localStorage` con la clave `pds.cart.v1`.
2. En `/carrito` elige **A domicilio** o **Recoger**, llena nombre/teléfono/
   dirección y al pulsar **“Pedir por WhatsApp”** la app:
   - inserta una fila en `orders` (Supabase),
   - genera el texto del pedido (lista, subtotal, envío, total + datos) y
   - abre `https://wa.me/<numero>?text=<mensaje-codificado>` en una pestaña
     nueva para que el cliente envíe el mensaje al negocio.
3. El botón flotante de WhatsApp en cada pantalla permite contacto directo sin
   pedido.

## PWA

- `app/layout.tsx` declara `manifest`, theme color y apple-touch-icon.
- `public/manifest.webmanifest` apunta a iconos 192/512/maskable.
- El sitio se puede instalar desde Chrome/Safari móvil (Compartir → Añadir a
  pantalla principal).

Para regenerar los iconos PNG (cuando cambies el color del brand):

```bash
node scripts/gen-icons.mjs
```

## Despliegue en Vercel

1. Push a GitHub.
2. Importa el repo en Vercel.
3. Configura las variables de entorno listadas arriba.
4. Deploy. La app no usa Edge runtime, así que cualquier región funciona.

## Personalización rápida

- **Colores**: edita `tailwind.config.ts` (`colors.brand` / `accent`).
- **Nombre / lema**: cambia `NEXT_PUBLIC_BUSINESS_NAME` o la fila de
  `business_info`.
- **Categorías**: solo agrega filas a `categories` y referencia el `slug` en
  `menu_items.category`.
- **Fotos**: sube a Supabase Storage (bucket `menu`) y pega la URL pública en
  `menu_items.image_url`.

## Notas técnicas

- Los datos del menú e info del negocio se cargan en *Server Components* con
  `revalidate` (`60s` para menú, `300s` para `/pagina`).
- El carrito vive del lado del cliente para responder instantáneamente.
- Las queries usan el cliente tipado de `@supabase/supabase-js` con `Database`
  generada manualmente en `lib/types.ts`.
- RLS está habilitado en todas las tablas: lectura pública para `categories`,
  `menu_items` y `business_info`; inserción anónima permitida en `orders`
  (sin lectura pública).
