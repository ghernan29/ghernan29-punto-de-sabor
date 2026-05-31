-- ─────────────────────────────────────────────────────────────────────
-- Punto de Sabor — esquema base
-- Ejecuta este script en el SQL editor de Supabase.
-- ─────────────────────────────────────────────────────────────────────

create extension if not exists "pgcrypto";

-- ─────────────────────────────  CATEGORÍAS  ──────────────────────────
create table if not exists public.categories (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  name        text not null,
  sort_order  int  not null default 0,
  created_at  timestamptz not null default now()
);

-- ──────────────────────────────  MENÚ  ───────────────────────────────
create table if not exists public.menu_items (
  id            uuid primary key default gen_random_uuid(),
  category      text not null references public.categories(slug) on update cascade,
  name          text not null,
  description   text,
  price         numeric(10,2) not null check (price >= 0),
  image_url     text,
  is_available  boolean not null default true,
  sort_order    int not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

create index if not exists menu_items_category_idx
  on public.menu_items (category, sort_order);

create index if not exists menu_items_available_idx
  on public.menu_items (is_available);

-- ──────────────────────────  INFO DEL NEGOCIO  ───────────────────────
create table if not exists public.business_info (
  id                int primary key default 1 check (id = 1), -- singleton
  name              text not null default 'Punto de Sabor',
  tagline           text,
  description       text,
  address           text,
  map_embed_url     text,
  phone             text,
  whatsapp_number   text,
  email             text,
  instagram_url     text,
  facebook_url      text,
  tiktok_url        text,
  hours             jsonb not null default '[]'::jsonb,
  -- hours = [{ "day": "Lunes", "open": "10:00", "close": "22:00", "closed": false }, ...]
  delivery_fee      numeric(10,2) not null default 0,
  min_order         numeric(10,2) not null default 0,
  currency          text not null default 'MXN',
  updated_at        timestamptz not null default now()
);

-- ───────────────────────────────  PEDIDOS  ───────────────────────────
create type public.order_type as enum ('delivery', 'pickup');
create type public.order_status as enum ('pending', 'confirmed', 'preparing', 'on_the_way', 'delivered', 'cancelled');

create table if not exists public.orders (
  id              uuid primary key default gen_random_uuid(),
  customer_name   text not null,
  customer_phone  text not null,
  type            public.order_type   not null default 'delivery',
  status          public.order_status not null default 'pending',
  address         text,
  notes           text,
  items           jsonb not null,
  -- items = [{ id, name, price, quantity, subtotal }, ...]
  subtotal        numeric(10,2) not null,
  delivery_fee    numeric(10,2) not null default 0,
  total           numeric(10,2) not null,
  created_at      timestamptz not null default now()
);

create index if not exists orders_created_at_idx
  on public.orders (created_at desc);

-- ────────────────────────────  RLS / POLÍTICAS  ──────────────────────
alter table public.categories     enable row level security;
alter table public.menu_items     enable row level security;
alter table public.business_info  enable row level security;
alter table public.orders         enable row level security;

-- Lectura pública del menú e info del negocio
drop policy if exists "categories are readable by anyone"    on public.categories;
drop policy if exists "menu_items are readable by anyone"    on public.menu_items;
drop policy if exists "business_info readable by anyone"     on public.business_info;
drop policy if exists "orders insertable by anyone"          on public.orders;

create policy "categories are readable by anyone"
  on public.categories for select using (true);

create policy "menu_items are readable by anyone"
  on public.menu_items for select using (true);

create policy "business_info readable by anyone"
  on public.business_info for select using (true);

-- Cualquiera puede crear un pedido (cliente), pero NO leerlos.
create policy "orders insertable by anyone"
  on public.orders for insert with check (true);

-- ──────────────────────────  STORAGE: imágenes  ──────────────────────
-- Bucket público sugerido: `menu`
-- En el dashboard de Supabase: Storage → New bucket → name=menu, public=true
-- Luego sube fotos y guarda las URLs públicas en menu_items.image_url.
