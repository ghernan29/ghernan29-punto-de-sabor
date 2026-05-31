create extension if not exists "pgcrypto";

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table if not exists public.menu_items (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  name text not null,
  description text not null,
  price numeric(10,2) not null check (price >= 0),
  image_url text,
  is_available boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.business_info (
  id uuid primary key default gen_random_uuid(),
  business_name text not null default 'Punto de Sabor',
  description text not null,
  hours text not null,
  address text not null,
  map_embed_url text,
  phone text not null,
  instagram_url text,
  facebook_url text,
  tiktok_url text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  phone text not null,
  order_type text not null check (order_type in ('delivery', 'pickup')),
  delivery_address text,
  notes text,
  items jsonb not null,
  subtotal numeric(10,2) not null check (subtotal >= 0),
  delivery_fee numeric(10,2) not null default 0 check (delivery_fee >= 0),
  total numeric(10,2) not null check (total >= 0),
  whatsapp_message text not null,
  status text not null default 'pending',
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists menu_items_category_sort_idx
  on public.menu_items (category, sort_order, name);

create index if not exists orders_created_at_idx
  on public.orders (created_at desc);

drop trigger if exists set_menu_items_updated_at on public.menu_items;
create trigger set_menu_items_updated_at
before update on public.menu_items
for each row execute procedure public.set_updated_at();

drop trigger if exists set_business_info_updated_at on public.business_info;
create trigger set_business_info_updated_at
before update on public.business_info
for each row execute procedure public.set_updated_at();

alter table public.menu_items enable row level security;
alter table public.business_info enable row level security;
alter table public.orders enable row level security;

drop policy if exists "Public can read menu items" on public.menu_items;
create policy "Public can read menu items"
on public.menu_items
for select
using (true);

drop policy if exists "Public can read business info" on public.business_info;
create policy "Public can read business info"
on public.business_info
for select
using (true);

insert into storage.buckets (id, name, public)
values ('menu-images', 'menu-images', true)
on conflict (id) do nothing;

drop policy if exists "Public can view menu images" on storage.objects;
create policy "Public can view menu images"
on storage.objects
for select
using (bucket_id = 'menu-images');

drop policy if exists "Authenticated users can upload menu images" on storage.objects;
create policy "Authenticated users can upload menu images"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'menu-images');

drop policy if exists "Authenticated users can update menu images" on storage.objects;
create policy "Authenticated users can update menu images"
on storage.objects
for update
to authenticated
using (bucket_id = 'menu-images')
with check (bucket_id = 'menu-images');

drop policy if exists "Authenticated users can delete menu images" on storage.objects;
create policy "Authenticated users can delete menu images"
on storage.objects
for delete
to authenticated
using (bucket_id = 'menu-images');
