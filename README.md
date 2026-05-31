# Punto de Sabor

Aplicación web móvil (PWA) para un restaurante/negocio de comida. Los clientes
pueden explorar el menú, armar un carrito y ordenar **por WhatsApp** o **a
domicilio**. Interfaz en español.

Construida con **Next.js 14 (App Router) + TypeScript + Tailwind CSS** y
**Supabase** (Postgres + Storage). Lista para desplegar en **Vercel**.

## Características

- **Menú** agrupado por categorías (Entradas, Platos Fuertes, Bebidas, Postres)
  con foto, descripción, precio y botón **Agregar**. Los platillos no
  disponibles se muestran como **Agotado**.
- **Nuestra Página**: descripción, horario, dirección con mapa embebido,
  teléfono y redes sociales (Instagram, Facebook, TikTok). Editable desde la
  tabla `business_info` sin redesplegar.
- **Ordenar por WhatsApp**: botón flotante en todas las páginas que genera un
  mensaje prellenado (`wa.me`) con cada platillo, cantidad, subtotal y total.
- **Pedidos a domicilio**: carrito con controles de cantidad, formulario de
  entrega (nombre, teléfono, dirección, notas, entrega/recoger), tarifa de
  envío configurable y monto mínimo de pedido. Al confirmar se guarda en la
  tabla `orders` y se abre el mensaje de WhatsApp.
- **PWA** instalable, mobile-first, con barra de navegación inferior.

> La app funciona con **datos de ejemplo** aunque Supabase no esté configurado,
> para que puedas probarla de inmediato. Conecta Supabase para usar tu menú
> real y guardar pedidos.

## Estructura

```
app/
  layout.tsx          # layout raíz, PWA, nav inferior, botón WhatsApp
  page.tsx            # Menú (home)
  loading.tsx         # estado de carga del menú
  carrito/page.tsx    # carrito + checkout
  pagina/page.tsx     # Nuestra Página (info del negocio)
  whatsapp/page.tsx   # contacto directo por WhatsApp
components/           # Header, BottomNav, tarjetas, carrito, iconos, etc.
lib/
  supabase.ts         # cliente Supabase tipado
  data.ts             # consultas (con fallback a datos de ejemplo)
  types.ts            # tipos + tipos de la base de datos
  cart.ts             # store del carrito (zustand, persistente)
  whatsapp.ts         # generación del mensaje y link wa.me
  config.ts           # config pública + formato de moneda
  sampleData.ts       # datos de ejemplo
supabase/
  schema.sql          # tablas + RLS
  seed.sql            # categorías y 10 platillos de ejemplo
public/               # manifest, service worker, iconos
```

## Puesta en marcha

1. Instala dependencias:

   ```bash
   npm install
   ```

2. Copia las variables de entorno:

   ```bash
   cp .env.example .env.local
   ```

   Completa `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` y
   `NEXT_PUBLIC_WHATSAPP_NUMBER` (solo dígitos, formato internacional).

3. Configura la base de datos en Supabase (SQL Editor):

   - Ejecuta `supabase/schema.sql`
   - Ejecuta `supabase/seed.sql` (recuerda poner tu `whatsapp_number` real)

4. Arranca en desarrollo:

   ```bash
   npm run dev
   ```

   Abre http://localhost:3000

## Variables de entorno

| Variable | Descripción | Ejemplo |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | URL del proyecto Supabase | `https://abc.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Llave anónima pública | `eyJ...` |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número de WhatsApp (solo dígitos) | `5215512345678` |
| `NEXT_PUBLIC_DELIVERY_FEE` | Tarifa fija de envío | `35` |
| `NEXT_PUBLIC_MINIMUM_ORDER` | Monto mínimo de pedido | `100` |
| `NEXT_PUBLIC_LOCALE` | Locale para formato | `es-MX` |
| `NEXT_PUBLIC_CURRENCY_CODE` | Código de moneda ISO | `MXN` |
| `NEXT_PUBLIC_CURRENCY_SYMBOL` | Símbolo de respaldo | `$` |
| `NEXT_PUBLIC_BUSINESS_NAME` | Nombre del negocio | `Punto de Sabor` |

> El `whatsapp_number` guardado en `business_info` (si existe) tiene prioridad
> sobre `NEXT_PUBLIC_WHATSAPP_NUMBER`.

## Imágenes del menú (Supabase Storage)

Crea un bucket público (p. ej. `menu`) en Supabase Storage, sube las fotos y
usa la URL pública en la columna `image_url` de `menu_items`. El dominio
`*.supabase.co` ya está permitido en `next.config.mjs`.

## Despliegue en Vercel

1. Importa el repositorio en Vercel.
2. Agrega las variables de entorno (las mismas de `.env.local`).
3. Deploy. Next.js se detecta automáticamente.

## Scripts

| Comando | Acción |
| --- | --- |
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Servir build de producción |
| `npm run lint` | ESLint |
| `npm run typecheck` | Verificación de tipos (tsc) |
