-- Punto de Sabor — sample data
-- Run AFTER schema.sql. Safe to re-run (clears existing menu/business rows first).

truncate table public.menu_items;
delete from public.business_info;

-- ---------------------------------------------------------
-- Business info (edit whatsapp_number to your real number!)
-- ---------------------------------------------------------
insert into public.business_info
  (name, description, hours, address, map_embed_url, phone,
   whatsapp_number, instagram_url, facebook_url, tiktok_url)
values (
  'Punto de Sabor',
  'En Punto de Sabor preparamos comida mexicana casera con ingredientes frescos todos los días. Disfruta de nuestros platillos en el local o pídelos a domicilio.',
  '[
    {"day": "Lunes",     "open": "09:00", "close": "20:00"},
    {"day": "Martes",    "open": "09:00", "close": "20:00"},
    {"day": "Miércoles", "open": "09:00", "close": "20:00"},
    {"day": "Jueves",    "open": "09:00", "close": "20:00"},
    {"day": "Viernes",   "open": "09:00", "close": "22:00"},
    {"day": "Sábado",    "open": "10:00", "close": "22:00"},
    {"day": "Domingo",   "open": "10:00", "close": "18:00"}
  ]'::jsonb,
  'Av. Reforma 123, Col. Centro, Ciudad de México',
  'https://www.google.com/maps?q=Avenida%20Reforma%20Centro%20Ciudad%20de%20Mexico&output=embed',
  '+52 55 1234 5678',
  '5215512345678',
  'https://instagram.com/puntodesabor',
  'https://facebook.com/puntodesabor',
  'https://tiktok.com/@puntodesabor'
);

-- ---------------------------------------------------------
-- Menu items
-- ---------------------------------------------------------
insert into public.menu_items
  (category, name, description, price, image_url, is_available, sort_order)
values
  ('Entradas', 'Guacamole con totopos',
   'Aguacate fresco, cilantro, cebolla y limón con totopos crujientes.',
   85, 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=800&q=70', true, 1),

  ('Entradas', 'Sopa de tortilla',
   'Caldo de jitomate con tiras de tortilla, aguacate, queso y chile pasilla.',
   75, 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=70', true, 2),

  ('Platos Fuertes', 'Tacos al pastor (orden)',
   'Cuatro tacos de cerdo marinado con piña, cebolla y cilantro.',
   120, 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=70', true, 1),

  ('Platos Fuertes', 'Enchiladas verdes',
   'Tortillas rellenas de pollo bañadas en salsa verde, crema y queso.',
   135, 'https://images.unsplash.com/photo-1534352956036-cd81e27dd615?auto=format&fit=crop&w=800&q=70', true, 2),

  ('Platos Fuertes', 'Mole poblano con arroz',
   'Pechuga de pollo en mole tradicional con ajonjolí y arroz rojo.',
   160, 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=70', false, 3),

  ('Bebidas', 'Agua de horchata',
   'Bebida de arroz con canela, dulce y refrescante. 500 ml.',
   35, 'https://images.unsplash.com/photo-1497534446932-c925b458314a?auto=format&fit=crop&w=800&q=70', true, 1),

  ('Bebidas', 'Agua de jamaica',
   'Flor de jamaica natural, ligeramente endulzada. 500 ml.',
   35, 'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&w=800&q=70', true, 2),

  ('Bebidas', 'Refresco de botella',
   'Coca-Cola, Sidral o agua mineral. 355 ml.',
   28, 'https://images.unsplash.com/photo-1581636625402-29b2a704ef13?auto=format&fit=crop&w=800&q=70', true, 3),

  ('Postres', 'Flan napolitano',
   'Flan casero cremoso con caramelo. Porción individual.',
   55, 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=70', true, 1),

  ('Postres', 'Churros con cajeta',
   'Churros recién hechos espolvoreados con azúcar y cajeta.',
   60, 'https://images.unsplash.com/photo-1624471339379-3e1f87a13e8a?auto=format&fit=crop&w=800&q=70', true, 2);
