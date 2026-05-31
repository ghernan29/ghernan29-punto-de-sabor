-- Punto de Sabor — Supabase schema
-- Run this in the Supabase SQL Editor before seed.sql

-- Menu items
CREATE TABLE IF NOT EXISTS menu_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
  image_url TEXT,
  is_available BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_menu_items_category ON menu_items (category, sort_order);

-- Business info (single row; use fixed id for upserts)
CREATE TABLE IF NOT EXISTS business_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL DEFAULT 'Punto de Sabor',
  description TEXT,
  hours_json JSONB NOT NULL DEFAULT '[]'::jsonb,
  address TEXT,
  map_embed_url TEXT,
  phone TEXT,
  instagram_url TEXT,
  facebook_url TEXT,
  tiktok_url TEXT,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Orders
CREATE TYPE order_fulfillment AS ENUM ('delivery', 'pickup');

CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  delivery_address TEXT,
  notes TEXT,
  fulfillment order_fulfillment NOT NULL DEFAULT 'delivery',
  items_json JSONB NOT NULL,
  subtotal NUMERIC(10, 2) NOT NULL,
  delivery_fee NUMERIC(10, 2) NOT NULL DEFAULT 0,
  total NUMERIC(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders (created_at DESC);

-- Row Level Security (public read for menu & business; insert orders)
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE business_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read menu_items"
  ON menu_items FOR SELECT
  USING (true);

CREATE POLICY "Public read business_info"
  ON business_info FOR SELECT
  USING (true);

CREATE POLICY "Public insert orders"
  ON orders FOR INSERT
  WITH CHECK (true);

-- Optional: allow anon inserts only (no read for customers)
CREATE POLICY "No public read orders"
  ON orders FOR SELECT
  USING (false);
