-- Punto de Sabor — Supabase schema
-- Run this in the Supabase SQL editor (or via the CLI) before seeding.

create extension if not exists "pgcrypto";

-- =========================================================
-- menu_items
-- =========================================================
create table if not exists public.menu_items (
  id          uuid primary key default gen_random_uuid(),
  category    text not null,
  name        text not null,
  description text,
  price       numeric(10, 2) not null default 0,
  image_url   text,
  is_available boolean not null default true,
  sort_order  integer not null default 0,
  created_at  timestamptz not null default now()
);

create index if not exists menu_items_category_sort_idx
  on public.menu_items (category, sort_order);

-- =========================================================
-- business_info  (single editable record)
-- =========================================================
create table if not exists public.business_info (
  id              uuid primary key default gen_random_uuid(),
  name            text not null default 'Punto de Sabor',
  description     text,
  hours           jsonb,        -- [{ "day": "Lunes", "open": "09:00", "close": "20:00", "closed": false }]
  address         text,
  map_embed_url   text,
  phone           text,
  whatsapp_number text,         -- digits only, international format (e.g. 5215512345678)
  instagram_url   text,
  facebook_url    text,
  tiktok_url      text,
  updated_at      timestamptz not null default now()
);

-- =========================================================
-- orders
-- =========================================================
create table if not exists public.orders (
  id              uuid primary key default gen_random_uuid(),
  customer_name   text not null,
  customer_phone  text not null,
  delivery_method text not null default 'delivery'
                  check (delivery_method in ('delivery', 'pickup')),
  address         text,
  notes           text,
  items           jsonb not null default '[]'::jsonb, -- [{ id, name, price, quantity }]
  subtotal        numeric(10, 2) not null default 0,
  delivery_fee    numeric(10, 2) not null default 0,
  total           numeric(10, 2) not null default 0,
  status          text not null default 'nuevo',
  created_at      timestamptz not null default now()
);

create index if not exists orders_created_at_idx
  on public.orders (created_at desc);

-- =========================================================
-- Row Level Security
-- The public site uses the anon key. Customers may:
--   * read the menu and business info
--   * create orders
-- They may NOT read other customers' orders or edit menu/business data.
-- Management of menu_items / business_info / order status should be done with
-- the service role key (server side) or the Supabase dashboard.
-- =========================================================
alter table public.menu_items   enable row level security;
alter table public.business_info enable row level security;
alter table public.orders        enable row level security;

drop policy if exists "menu_items_public_read" on public.menu_items;
create policy "menu_items_public_read"
  on public.menu_items for select
  to anon, authenticated
  using (true);

drop policy if exists "business_info_public_read" on public.business_info;
create policy "business_info_public_read"
  on public.business_info for select
  to anon, authenticated
  using (true);

drop policy if exists "orders_public_insert" on public.orders;
create policy "orders_public_insert"
  on public.orders for insert
  to anon, authenticated
  with check (true);
