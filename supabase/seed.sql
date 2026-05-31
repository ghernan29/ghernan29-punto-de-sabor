truncate table public.orders restart identity;
truncate table public.menu_items restart identity cascade;
truncate table public.business_info restart identity cascade;

insert into public.menu_items (category, name, description, price, image_url, is_available, sort_order)
values
  (
    'Entradas',
    'Guacamole de la Casa',
    'Aguacate fresco con pico de gallo, totopos crujientes y toque de limon.',
    95,
    'https://images.unsplash.com/photo-1604909052743-94e838986d24?auto=format&fit=crop&w=900&q=80',
    true,
    10
  ),
  (
    'Entradas',
    'Queso Fundido',
    'Queso gratinado con chorizo artesanal, servido con tortillas calientes.',
    125,
    'https://images.unsplash.com/photo-1625944525533-473f1a3d54e7?auto=format&fit=crop&w=900&q=80',
    true,
    20
  ),
  (
    'Entradas',
    'Tostadas de Tinga',
    'Tostadas doradas con pollo en tinga, crema, lechuga y queso fresco.',
    110,
    'https://images.unsplash.com/photo-1613514785940-daed07799d9b?auto=format&fit=crop&w=900&q=80',
    false,
    30
  ),
  (
    'Platos Fuertes',
    'Tacos Gobernador',
    'Tres tacos de camaron salteado con queso, pimientos y salsa especial.',
    185,
    'https://images.unsplash.com/photo-1611250188496-e966043a0629?auto=format&fit=crop&w=900&q=80',
    true,
    10
  ),
  (
    'Platos Fuertes',
    'Milanesa Punto',
    'Milanesa crujiente con ensalada fresca, papas doradas y salsa de la casa.',
    175,
    'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=900&q=80',
    true,
    20
  ),
  (
    'Platos Fuertes',
    'Bowl de Pollo Asado',
    'Arroz, frijoles, elote, pollo marinado, aguacate y aderezo cremoso.',
    165,
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80',
    true,
    30
  ),
  (
    'Bebidas',
    'Agua Fresca de Jamaica',
    'Preparada al dia, refrescante y ligeramente dulce.',
    45,
    'https://images.unsplash.com/photo-1621263764928-df1444c5e859?auto=format&fit=crop&w=900&q=80',
    true,
    10
  ),
  (
    'Bebidas',
    'Limonada Mineral',
    'Limon fresco, agua mineral y jarabe natural.',
    55,
    'https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&w=900&q=80',
    true,
    20
  ),
  (
    'Postres',
    'Flan Napolitano',
    'Flan cremoso con caramelo dorado y vainilla.',
    70,
    'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?auto=format&fit=crop&w=900&q=80',
    true,
    10
  ),
  (
    'Postres',
    'Churros con Chocolate',
    'Churros recien hechos con azucar canela y chocolate espeso.',
    85,
    'https://images.unsplash.com/photo-1624371414361-e670edf4898d?auto=format&fit=crop&w=900&q=80',
    true,
    20
  );

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
  'Somos un negocio local de comida fresca, porciones generosas y recetas llenas de sabor. Preparamos cada pedido al momento para que llegue caliente a tu mesa o a tu puerta.',
  '[
    {"day": "Lunes a Viernes", "hours": "12:00 PM - 10:00 PM"},
    {"day": "Sabado", "hours": "1:00 PM - 11:00 PM"},
    {"day": "Domingo", "hours": "1:00 PM - 8:00 PM"}
  ]'::jsonb,
  'Av. Principal 123, Centro, Ciudad',
  'https://www.google.com/maps?q=Ciudad%20de%20Mexico&output=embed',
  '+52 55 5555 5555',
  'https://instagram.com/puntodesabor',
  'https://facebook.com/puntodesabor',
  'https://tiktok.com/@puntodesabor'
);
