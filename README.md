# Punto de Sabor

Aplicación web para restaurante: menú, carrito, pedidos con entrega y confirmación por WhatsApp. Construida con **Next.js 14**, **Supabase** y **Tailwind CSS**, optimizada para móvil e instalable como PWA.

## Características

- **Menú** por categorías desde Supabase (`menu_items`)
- **Nuestra Página** con horarios, mapa y redes (`business_info`)
- **Carrito** con cantidades, envío/recoger, pedido mínimo y costo de envío
- **WhatsApp** flotante + mensaje prefilled al pedir
- **Pedidos** guardados en `orders` + apertura de WhatsApp al confirmar

## Inicio rápido

### 1. Supabase

1. Crea un proyecto en [Supabase](https://supabase.com).
2. En el **SQL Editor**, ejecuta en orden:
   - `supabase/schema.sql`
   - `supabase/seed.sql`
3. (Opcional) Sube imágenes al bucket **Storage** y actualiza `image_url` en `menu_items`.

### 2. Variables de entorno

```bash
cp .env.example .env.local
```

Completa:

| Variable | Descripción |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | URL del proyecto |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Clave anónima pública |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Número sin `+` (ej. `525512345678`) |
| `NEXT_PUBLIC_DELIVERY_FEE` | Costo fijo de envío |
| `NEXT_PUBLIC_MINIMUM_ORDER` | Pedido mínimo |
| `NEXT_PUBLIC_SITE_URL` | URL del sitio (producción) |

### 3. Desarrollo

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

### 4. Vercel

1. Importa el repositorio en [Vercel](https://vercel.com).
2. Añade las mismas variables de entorno.
3. Despliega. El dominio de producción debe usarse en `NEXT_PUBLIC_SITE_URL`.

## Estructura del proyecto

```
app/                 # Rutas App Router (/, /carrito, /pagina)
components/          # UI: menú, carrito, layout, negocio
context/             # Estado del carrito (localStorage)
lib/                 # Supabase, WhatsApp, tipos, helpers
supabase/            # schema.sql + seed.sql
public/              # PWA manifest, service worker, íconos
```

## Navegación móvil

Barra inferior: **Menú** · **Carrito** · **Página** · **WhatsApp**

## Licencia

Privado — Punto de Sabor.
