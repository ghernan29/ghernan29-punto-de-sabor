# Punto de Sabor - Web App (Next.js 14 + Supabase + PWA)

Aplicacion web mobile-first para restaurante/comida con menu digital, carrito, checkout y confirmacion por WhatsApp.

## 1) Estructura del proyecto

```txt
.
├── app
│   ├── carrito/page.tsx
│   ├── pagina/page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   ├── manifest.ts
│   ├── page.tsx
│   └── providers.tsx
├── components
│   ├── bottom-nav.tsx
│   ├── business-info-panel.tsx
│   ├── cart-checkout.tsx
│   ├── floating-whatsapp-button.tsx
│   ├── menu-browser.tsx
│   └── menu-item-card.tsx
├── lib
│   ├── cart-context.tsx
│   ├── config.ts
│   ├── currency.ts
│   ├── database.types.ts
│   ├── supabase.ts
│   └── whatsapp.ts
├── public/icons
│   ├── icon-192.svg
│   └── icon-512.svg
├── supabase
│   ├── schema.sql
│   └── seed.sql
├── .env.example
├── next.config.mjs
├── package.json
└── tailwind.config.ts
```

## 2) Supabase schema y seed

1. Crear proyecto en Supabase.
2. En SQL Editor, ejecutar:
   - `supabase/schema.sql`
   - `supabase/seed.sql`
3. El seed crea:
   - categorias Entradas, Platos Fuertes, Bebidas, Postres
   - 10 items de ejemplo
   - 1 registro de `business_info`

Tablas principales:

- `menu_items`: menu editable (foto, precio, disponibilidad, orden)
- `business_info`: datos de "Nuestra Pagina"
- `orders`: pedidos enviados desde checkout

Incluye RLS y politicas para:

- lectura publica de menu y business info
- insercion publica de pedidos

## 3) Variables de entorno

Copiar `.env.example` a `.env.local` y completar:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_WHATSAPP_NUMBER=573001112233
NEXT_PUBLIC_BUSINESS_NAME=Punto de Sabor
NEXT_PUBLIC_DELIVERY_FEE=5000
NEXT_PUBLIC_MIN_ORDER_AMOUNT=15000
```

## 4) Desarrollo local

```bash
npm install
npm run dev
```

Abrir http://localhost:3000

## 5) Features incluidas

- Menu por categorias con datos desde Supabase
- Items agotados deshabilitados con etiqueta "Agotado"
- Carrito con controles de cantidad y total en vivo
- Checkout con:
  - nombre
  - telefono
  - direccion
  - notas
  - toggle domicilio/recoger
- Validacion de minimo de pedido y costo de domicilio configurable
- Insercion de pedido en tabla `orders` y apertura de WhatsApp con mensaje prellenado
- Pagina "Nuestra Pagina" editable desde `business_info`
- Navegacion inferior mobile: Menu, Carrito, Pagina, WhatsApp
- Boton flotante de WhatsApp en todas las vistas
- App instalable como PWA (`manifest` + `next-pwa`)

## 6) Despliegue en Vercel

1. Importar repositorio en Vercel.
2. Configurar variables de entorno iguales a `.env.example`.
3. Deploy.
