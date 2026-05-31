create extension if not exists pgcrypto;

create table if not exists public.menu_items (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  name text not null,
  description text not null,
  price numeric(10, 2) not null check (price >= 0),
  image_url text,
  is_available boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists menu_items_category_sort_idx
  on public.menu_items (category, sort_order);

create table if not exists public.business_info (
  id uuid primary key default gen_random_uuid(),
  business_name text not null default 'Punto de Sabor',
  description text not null,
  hours jsonb not null default '[]'::jsonb,
  address text not null,
  map_embed_url text,
  phone text not null,
  instagram_url text,
  facebook_url text,
  tiktok_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  customer_phone text not null,
  delivery_type text not null check (delivery_type in ('delivery', 'pickup')),
  delivery_address text,
  notes text,
  items jsonb not null,
  subtotal numeric(10, 2) not null check (subtotal >= 0),
  delivery_fee numeric(10, 2) not null default 0 check (delivery_fee >= 0),
  total numeric(10, 2) not null check (total >= 0),
  status text not null default 'pending_whatsapp' check (status in ('pending_whatsapp', 'confirmed', 'cancelled', 'completed')),
  created_at timestamptz not null default now()
);

create index if not exists orders_created_at_idx
  on public.orders (created_at desc);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_menu_items_updated_at on public.menu_items;
create trigger set_menu_items_updated_at
  before update on public.menu_items
  for each row
  execute function public.set_updated_at();

drop trigger if exists set_business_info_updated_at on public.business_info;
create trigger set_business_info_updated_at
  before update on public.business_info
  for each row
  execute function public.set_updated_at();

alter table public.menu_items enable row level security;
alter table public.business_info enable row level security;
alter table public.orders enable row level security;

drop policy if exists "Public can read menu items" on public.menu_items;
create policy "Public can read menu items"
  on public.menu_items
  for select
  to anon
  using (true);

drop policy if exists "Public can read business info" on public.business_info;
create policy "Public can read business info"
  on public.business_info
  for select
  to anon
  using (true);

drop policy if exists "Public can create orders" on public.orders;
create policy "Public can create orders"
  on public.orders
  for insert
  to anon
  with check (true);

insert into storage.buckets (id, name, public)
values ('menu-images', 'menu-images', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "Public can read menu images" on storage.objects;
create policy "Public can read menu images"
  on storage.objects
  for select
  to anon
  using (bucket_id = 'menu-images');
