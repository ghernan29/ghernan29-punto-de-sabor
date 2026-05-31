truncate table public.orders restart identity cascade;
truncate table public.menu_items restart identity cascade;
truncate table public.business_info restart identity cascade;

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
  'Punto de Sabor es una cocina cercana y antojada que mezcla recetas caseras, ingredientes frescos y porciones generosas para compartir en familia o resolver el antojo del dia.',
  E'Lunes a jueves: 11:30 a.m. - 9:00 p.m.\nViernes y sabado: 11:30 a.m. - 10:00 p.m.\nDomingo: 12:00 p.m. - 8:00 p.m.',
  'Cra. 42 #8-15, Medellin, Antioquia',
  'https://www.google.com/maps?q=Cra.+42+%238-15,+Medellin,+Antioquia&output=embed',
  '+57 300 123 4567',
  'https://www.instagram.com/',
  'https://www.facebook.com/',
  'https://www.tiktok.com/'
);

insert into public.menu_items (
  category,
  name,
  description,
  price,
  image_url,
  is_available,
  sort_order
)
values
  (
    'Entradas',
    'Tequenos de queso',
    'Cinco tequenos dorados al momento, con salsa de ajo de la casa.',
    7.50,
    'https://images.unsplash.com/photo-1625944525533-473f1b3d54f6?auto=format&fit=crop&w=900&q=80',
    true,
    1
  ),
  (
    'Entradas',
    'Patacones con hogao',
    'Crujientes patacones con hogao artesanal y queso rallado.',
    6.00,
    'https://images.unsplash.com/photo-1532634786-8f5043ed7cf7?auto=format&fit=crop&w=900&q=80',
    true,
    2
  ),
  (
    'Platos Fuertes',
    'Hamburguesa Punto',
    'Carne a la parrilla, queso cheddar, tocineta crocante y salsa especial.',
    13.90,
    'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=80',
    true,
    1
  ),
  (
    'Platos Fuertes',
    'Bowl criollo de pollo',
    'Arroz, frijol negro, pollo a la plancha, aguacate y maiz dulce.',
    12.80,
    'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80',
    true,
    2
  ),
  (
    'Platos Fuertes',
    'Pasta cremosa con camarones',
    'Pasta al dente con salsa cremosa de ajo, camarones y perejil fresco.',
    16.40,
    'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?auto=format&fit=crop&w=900&q=80',
    true,
    3
  ),
  (
    'Platos Fuertes',
    'Tacos de birria',
    'Tres tacos rellenos de birria, cebolla, cilantro y consome.',
    14.25,
    'https://images.unsplash.com/photo-1613514785940-daed07799d9b?auto=format&fit=crop&w=900&q=80',
    false,
    4
  ),
  (
    'Bebidas',
    'Limonada de coco',
    'Refrescante limonada cremosa con coco y hielo frappe.',
    4.80,
    'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=80',
    true,
    1
  ),
  (
    'Bebidas',
    'Maracuya sparkle',
    'Bebida burbujeante de maracuya con toque citrico.',
    4.20,
    'https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=80',
    true,
    2
  ),
  (
    'Postres',
    'Tres leches de la casa',
    'Bizcocho suave bañado en mezcla de tres leches y canela.',
    5.90,
    'https://images.unsplash.com/photo-1551024506-0bccd828d307?auto=format&fit=crop&w=900&q=80',
    true,
    1
  ),
  (
    'Postres',
    'Brownie caliente con helado',
    'Brownie de chocolate, salsa tibia y helado de vainilla.',
    6.50,
    'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=900&q=80',
    true,
    2
  );
