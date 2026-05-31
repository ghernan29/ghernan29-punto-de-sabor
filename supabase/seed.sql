-- Punto de Sabor — sample data
-- Run after schema.sql

INSERT INTO business_info (
  name,
  description,
  hours_json,
  address,
  map_embed_url,
  phone,
  instagram_url,
  facebook_url,
  tiktok_url
) VALUES (
  'Punto de Sabor',
  'Somos un restaurante de comida casera con sazón latino. Preparamos cada plato con ingredientes frescos y recetas de familia. ¡Te esperamos con el corazón en la cocina!',
  '[
    {"day": "Lunes", "hours": "12:00 – 21:00"},
    {"day": "Martes", "hours": "12:00 – 21:00"},
    {"day": "Miércoles", "hours": "12:00 – 21:00"},
    {"day": "Jueves", "hours": "12:00 – 22:00"},
    {"day": "Viernes", "hours": "12:00 – 23:00"},
    {"day": "Sábado", "hours": "11:00 – 23:00"},
    {"day": "Domingo", "hours": "11:00 – 20:00"}
  ]'::jsonb,
  'Av. Insurgentes Sur 1234, Col. Del Valle, CDMX',
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.0!2d-99.167!3d19.385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDIzJzA2LjAiTiA5OcKwMTAnMDEuMiJX!5e0!3m2!1ses!2smx!4v1',
  '+525512345678',
  'https://instagram.com/puntodesabor',
  'https://facebook.com/puntodesabor',
  'https://tiktok.com/@puntodesabor'
);

INSERT INTO menu_items (category, name, description, price, image_url, is_available, sort_order) VALUES
  ('Entradas', 'Guacamole fresco', 'Aguacate machacado con cilantro, limón y totopos caseros.', 89.00, 'https://images.unsplash.com/photo-1529042410759-befb1204b468?w=800&q=80', true, 1),
  ('Entradas', 'Empanadas de queso', 'Tres empanadas doradas rellenas de queso fundido.', 75.00, 'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800&q=80', true, 2),
  ('Platos Fuertes', 'Pollo a la plancha', 'Pechuga marinada con arroz rojo y ensalada verde.', 165.00, 'https://images.unsplash.com/photo-1598103442097-257379185852?w=800&q=80', true, 1),
  ('Platos Fuertes', 'Enchiladas suizas', 'Cuatro enchiladas bañadas en salsa verde y crema.', 145.00, 'https://images.unsplash.com/photo-1613514785940-daed07799d9b?w=800&q=80', true, 2),
  ('Platos Fuertes', 'Carne asada', 'Corte de res a la parrilla con frijoles y tortillas.', 195.00, 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80', false, 3),
  ('Bebidas', 'Agua de jamaica', 'Refrescante, hecha en casa. Vaso grande.', 45.00, 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=800&q=80', true, 1),
  ('Bebidas', 'Limonada natural', 'Con hierbabuena y hielo.', 42.00, 'https://images.unsplash.com/photo-1621263833824-fb03f2a3e2e1?w=800&q=80', true, 2),
  ('Bebidas', 'Cerveza artesanal', 'Selección del día. Pregunta por marcas disponibles.', 65.00, 'https://images.unsplash.com/photo-1608270586622-248048c2ca0e?w=800&q=80', true, 3),
  ('Postres', 'Flan casero', 'Caramelo suave con vainilla natural.', 55.00, 'https://images.unsplash.com/photo-1587334207828-9f228f84dece?w=800&q=80', true, 1),
  ('Postres', 'Churros con chocolate', 'Cuatro churros crujientes con salsa de chocolate.', 68.00, 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=800&q=80', true, 2);
