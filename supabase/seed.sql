-- ─────────────────────────────────────────────────────────────────────
-- Punto de Sabor — datos de ejemplo
-- Ejecuta después de schema.sql para poblar el menú e info del negocio.
-- ─────────────────────────────────────────────────────────────────────

-- Limpia datos previos (opcional, comenta si no quieres truncar)
truncate table public.menu_items restart identity cascade;
delete from public.categories;
delete from public.business_info;

-- ─── Categorías ──────────────────────────────────────────────────────
insert into public.categories (slug, name, sort_order) values
  ('entradas',       'Entradas',       1),
  ('platos-fuertes', 'Platos Fuertes', 2),
  ('bebidas',        'Bebidas',        3),
  ('postres',        'Postres',        4);

-- ─── Menú ────────────────────────────────────────────────────────────
insert into public.menu_items (category, name, description, price, image_url, is_available, sort_order) values
  ('entradas', 'Guacamole de la casa',
   'Aguacate Hass machacado al momento con cilantro, cebolla morada, jitomate y totopos crujientes.',
   95.00,
   'https://images.unsplash.com/photo-1600335895229-6e75511892c8?auto=format&fit=crop&w=900&q=70',
   true, 1),

  ('entradas', 'Sopecitos surtidos (4 pz)',
   'Cuatro sopecitos con frijol refrito, tinga, cochinita y rajas con queso fresco.',
   110.00,
   'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=900&q=70',
   true, 2),

  ('platos-fuertes', 'Tacos al pastor (orden de 4)',
   'Cerdo marinado al trompo con piña, cebolla, cilantro y salsa verde tatemada.',
   145.00,
   'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=900&q=70',
   true, 1),

  ('platos-fuertes', 'Enchiladas verdes con pollo',
   'Tres enchiladas bañadas en salsa verde, rellenas de pollo deshebrado, crema, queso fresco y cebolla.',
   165.00,
   'https://images.unsplash.com/photo-1534352956036-cd81e27dd615?auto=format&fit=crop&w=900&q=70',
   true, 2),

  ('platos-fuertes', 'Mole poblano con arroz',
   'Pechuga de pollo bañada en mole poblano de la casa, acompañada de arroz rojo y tortillas hechas a mano.',
   190.00,
   'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?auto=format&fit=crop&w=900&q=70',
   true, 3),

  ('platos-fuertes', 'Chiles en nogada (temporada)',
   'Chile poblano relleno de picadillo de res y frutas, bañado en nogada y granada. Solo agosto–septiembre.',
   245.00,
   'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=70',
   false, 4),

  ('bebidas', 'Agua fresca del día (1 L)',
   'Jamaica, horchata o limón con chía, preparadas al momento.',
   55.00,
   'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&w=900&q=70',
   true, 1),

  ('bebidas', 'Refresco mexicano',
   'Coca-Cola, Sidral Mundet, Squirt o Boing en botella de vidrio.',
   35.00,
   'https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?auto=format&fit=crop&w=900&q=70',
   true, 2),

  ('postres', 'Flan napolitano',
   'Clásico flan casero con caramelo de la abuela.',
   65.00,
   'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=900&q=70',
   true, 1),

  ('postres', 'Pay de elote',
   'Rebanada de pay tibio de elote con un toque de canela y crema batida.',
   75.00,
   'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=900&q=70',
   true, 2);

-- ─── Info del negocio ────────────────────────────────────────────────
insert into public.business_info
  (id, name, tagline, description, address, map_embed_url, phone, whatsapp_number,
   email, instagram_url, facebook_url, tiktok_url, hours,
   delivery_fee, min_order, currency)
values
  (1,
   'Punto de Sabor',
   'Cocina mexicana hecha con cariño',
   'En Punto de Sabor cocinamos recetas tradicionales mexicanas con ingredientes frescos del mercado. Atendemos para llevar, a domicilio y en nuestro pequeño comedor familiar.',
   'Av. Reforma 123, Col. Centro, Ciudad de México, CDMX',
   'https://www.google.com/maps?q=Avenida%20Reforma%20123%20CDMX&output=embed',
   '+52 55 1234 5678',
   '5215512345678',
   'hola@puntodesabor.mx',
   'https://instagram.com/puntodesabor',
   'https://facebook.com/puntodesabor',
   'https://tiktok.com/@puntodesabor',
   '[
     {"day":"Lunes",     "open":"10:00","close":"22:00","closed":false},
     {"day":"Martes",    "open":"10:00","close":"22:00","closed":false},
     {"day":"Miércoles", "open":"10:00","close":"22:00","closed":false},
     {"day":"Jueves",    "open":"10:00","close":"22:00","closed":false},
     {"day":"Viernes",   "open":"10:00","close":"23:00","closed":false},
     {"day":"Sábado",    "open":"11:00","close":"23:00","closed":false},
     {"day":"Domingo",   "open":"11:00","close":"20:00","closed":false}
   ]'::jsonb,
   35.00,
   120.00,
   'MXN');
