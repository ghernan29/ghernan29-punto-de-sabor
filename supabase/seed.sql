truncate table public.orders restart identity;
truncate table public.business_info restart identity cascade;
truncate table public.menu_items cascade;

insert into public.business_info (
  business_name,
  description,
  hours,
  address,
  map_embed_url,
  phone,
  instagram_url,
  facebook_url,
  tiktok_url
)
values (
  'Punto de Sabor',
  'Somos una cocina local apasionada por los sabores caseros, porciones generosas y atencion cercana. Trabajamos con ingredientes frescos todos los dias.',
  'Lunes a Sabado: 11:00 AM - 10:00 PM | Domingo: 12:00 PM - 8:00 PM',
  'Calle 45 # 12-34, Barrio Centro, Medellin',
  'https://www.google.com/maps?q=Medellin&output=embed',
  '+57 300 111 2233',
  'https://instagram.com/puntodesabor',
  'https://facebook.com/puntodesabor',
  'https://tiktok.com/@puntodesabor'
);

insert into public.menu_items (category, name, description, price, image_url, is_available, sort_order)
values
  (
    'Entradas',
    'Patacones con Hogao',
    'Patacones crujientes con hogao casero y queso rallado.',
    12000,
    'https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=900&q=80',
    true,
    1
  ),
  (
    'Entradas',
    'Empanaditas de Carne',
    'Seis empanaditas doradas con salsa de aji de la casa.',
    10000,
    'https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?auto=format&fit=crop&w=900&q=80',
    true,
    2
  ),
  (
    'Platos Fuertes',
    'Bowl Criollo',
    'Arroz, frijoles, maduro, chicharron crocante y aguacate.',
    26000,
    'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=900&q=80',
    true,
    1
  ),
  (
    'Platos Fuertes',
    'Pollo a la Parrilla',
    'Pechuga a la parrilla con papas rusticas y ensalada fresca.',
    24000,
    'https://images.unsplash.com/photo-1598514982846-5f162b1d56d8?auto=format&fit=crop&w=900&q=80',
    true,
    2
  ),
  (
    'Platos Fuertes',
    'Pasta Cremosa de Camaron',
    'Pasta larga en salsa cremosa con camaron y toque de limon.',
    32000,
    'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=900&q=80',
    false,
    3
  ),
  (
    'Bebidas',
    'Limonada de Coco',
    'Limonada artesanal con coco cremosa y hielo frappe.',
    11000,
    'https://images.unsplash.com/photo-1499638673689-79a0b5115d87?auto=format&fit=crop&w=900&q=80',
    true,
    1
  ),
  (
    'Bebidas',
    'Jugo Natural de Mango',
    'Jugo natural de mango en agua o leche.',
    9000,
    'https://images.unsplash.com/photo-1600271886742-f049cd5bba3f?auto=format&fit=crop&w=900&q=80',
    true,
    2
  ),
  (
    'Postres',
    'Cheesecake de Maracuya',
    'Porcion de cheesecake suave con salsa de maracuya.',
    13000,
    'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=900&q=80',
    true,
    1
  ),
  (
    'Postres',
    'Torta Tres Leches',
    'Bizcocho humedo de tres leches con canela.',
    12000,
    'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=900&q=80',
    true,
    2
  ),
  (
    'Postres',
    'Brownie con Helado',
    'Brownie tibio con bola de helado de vainilla.',
    14000,
    'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80',
    true,
    3
  );
