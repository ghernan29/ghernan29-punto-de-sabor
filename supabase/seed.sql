-- Punto de Sabor — menú completo (según carta del restaurante)
-- Run after schema.sql. Safe to re-run: borra ítems previos del menú.

DELETE FROM menu_items;

-- Solo inserta info del negocio si la tabla está vacía
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
)
SELECT
  'Punto de Sabor',
  'Restaurante de comida latina y caribeña: mariscos, arroces, especialidades al horno y catering. Platillos con arroz y habichuelas, tostones o papas fritas.',
  '[
    {"day": "Lunes", "hours": "11:00 – 21:00"},
    {"day": "Martes", "hours": "11:00 – 21:00"},
    {"day": "Miércoles", "hours": "11:00 – 21:00"},
    {"day": "Jueves", "hours": "11:00 – 22:00"},
    {"day": "Viernes", "hours": "11:00 – 23:00"},
    {"day": "Sábado", "hours": "11:00 – 23:00"},
    {"day": "Domingo", "hours": "11:00 – 20:00"}
  ]'::jsonb,
  'Consulta dirección en local o por WhatsApp',
  NULL,
  '+15551234567',
  'https://instagram.com/puntodesabor',
  'https://facebook.com/puntodesabor',
  'https://tiktok.com/@puntodesabor'
WHERE NOT EXISTS (SELECT 1 FROM business_info LIMIT 1);

-- Helper: precio pedido/orden para especiales diarios
-- description incluye precio almuerzo cuando aplica

INSERT INTO menu_items (category, name, description, price, image_url, is_available, sort_order) VALUES

-- ESPECIAL DIARIO (precio en app = pedido/orden; almuerzo en descripción)
('Especial Diario', 'Pollo al Horno', 'Roasted Chicken. Incluye arroz y habichuelas, tostones o papas fritas. Almuerzo $8.99', 15.99, NULL, true, 1),
('Especial Diario', 'Pollo Guisado', 'Stewed Chicken. Almuerzo $8.99', 14.99, NULL, true, 2),
('Especial Diario', 'Pollo al Caldero', 'Stove Top Chicken. Almuerzo $8.99', 14.99, NULL, true, 3),
('Especial Diario', 'Pernil', 'Roasted Pork. Almuerzo $8.99', 16.99, NULL, true, 4),
('Especial Diario', 'Costilla al Horno', 'Baked Spare Ribs. Almuerzo $8.99', 16.99, NULL, true, 5),
('Especial Diario', 'Res Guisada', 'Stewed Beef. Almuerzo $10.99', 19.99, NULL, true, 6),
('Especial Diario', 'Patitas de Cerdo Guisada', 'Stewed Pig Feet. Almuerzo $8.99', 14.99, NULL, true, 7),
('Especial Diario', 'Chivo Guisado', 'Stewed Goat. Almuerzo $12.99', 16.99, NULL, true, 8),
('Especial Diario', 'Bacalao Guisado', 'Codfish Stew. Almuerzo $10.99', 18.99, NULL, true, 9),
('Especial Diario', 'Chuleta Frita', 'Fried Pork Chops. Almuerzo $9.99', 15.99, NULL, true, 10),
('Especial Diario', 'Chicharrón de Pollo', 'Fried Chicken Chunks. Almuerzo $8.99', 15.99, NULL, true, 11),
('Especial Diario', 'Pescado Frito', 'Fried Fish. Almuerzo $10.99', 16.99, NULL, true, 12),
('Especial Diario', 'Rabo', 'Oxtails. Almuerzo $13.99', 23.99, NULL, true, 13),
('Especial Diario', 'Berenjenas', 'Eggplant. Almuerzo $7.99', 13.99, NULL, true, 14),

-- MARISCOS
('Mariscos', 'Filete de Pescado', 'Fish Filet', 19.99, NULL, true, 1),
('Mariscos', 'Filete de Salmón', 'Salmon Filet', 23.99, NULL, true, 2),
('Mariscos', 'Pescado Colorado', 'Red Snapper', 34.99, NULL, true, 3),
('Mariscos', 'Camarones al Ajillo', 'Shrimp in Garlic Sauce', 22.99, NULL, true, 4),
('Mariscos', 'Camarones Empanizados', 'Breaded Shrimp', 20.99, NULL, true, 5),
('Mariscos', 'Camarones Enchilados', 'Shrimp Hot Sauce', 20.99, NULL, true, 6),
('Mariscos', 'Camarones a la Plancha', 'Broiled Shrimp', 20.99, NULL, true, 7),
('Mariscos', 'Lambi Guisado', 'Stewed Conch', 17.99, NULL, true, 8),
('Mariscos', 'Mariscada en Salsa', 'Seafood Combination', 34.99, NULL, true, 9),
('Mariscos', 'Langosta Enchilada', 'Lobster in Hot Sauce', 34.99, NULL, true, 10),
('Mariscos', 'Cola de Langosta a la Parrilla', 'Grilled Lobster Tail', 34.99, NULL, true, 11),
('Mariscos', 'Mar y Tierra', 'Surf and Turf', 34.99, NULL, true, 12),
('Mariscos', 'Masa de Cangrejo', 'Crab Mass', 21.99, NULL, true, 13),

-- BIEN FRITOS
('Bien Fritos', 'Chicharrón de Pollo con Hueso', 'Fried Chicken Chunks w/ Bone', 15.99, NULL, true, 1),
('Bien Fritos', 'Chicharrón de Pollo sin Hueso', 'Boneless Fried Chicken Chunks', 15.99, NULL, true, 2),
('Bien Fritos', 'Bistec Empanizado', 'Breaded Steak', 15.99, NULL, true, 3),
('Bien Fritos', 'Carne de Res Frita', 'Fried Beef Meat', 15.99, NULL, true, 4),
('Bien Fritos', 'Pechuga Empanizada', 'Breaded Chicken Breast', 15.99, NULL, true, 5),

-- PECHUGA
('Pechuga', 'Pechuga Rellena de Jamón y Queso', 'Chicken Breast with Ham and Cheese', 22.00, NULL, true, 1),
('Pechuga', 'Pechuga Rellena de Camarones', 'Shrimp Stuffed Breast', 27.99, NULL, true, 2),
('Pechuga', 'Pechuga Rellena de Marisco', 'Seafood Stuffed Breast', 34.99, NULL, true, 3),
('Pechuga', 'Pechuga Rellena de Vegetales', 'Vegetable Stuffed Breast', 21.99, NULL, true, 4),

-- ARROCES Y ASOPADOS
('Arroces y Asopados', 'Arroz con Pollo', 'Rice w/ Chicken', 15.99, NULL, true, 1),
('Arroces y Asopados', 'Arroz con Camarones', 'Rice w/ Shrimp', 20.99, NULL, true, 2),
('Arroces y Asopados', 'Arroz con Langosta', 'Rice w/ Lobster', 34.99, NULL, true, 3),
('Arroces y Asopados', 'Asopao de Pollo', 'Chicken Soupy Rice', 14.99, NULL, true, 4),
('Arroces y Asopados', 'Asopao de Camarones', 'Shrimp Soupy Rice', 20.99, NULL, true, 5),
('Arroces y Asopados', 'Asopao de Langosta', 'Lobster Soupy Rice', 34.99, NULL, true, 6),
('Arroces y Asopados', 'Asopao o Sopa de Marisco', 'Seafood Soup or Soupy Rice', 34.99, NULL, true, 7),
('Arroces y Asopados', 'Paella Marinera (1 persona)', 'Seafood Paella — 1 person', 27.99, NULL, true, 8),
('Arroces y Asopados', 'Paella Marinera (2 personas)', 'Seafood Paella — 2 people', 38.99, NULL, true, 9),

-- SOPAS
('Sopas', 'Sopa de Pollo', 'Chicken Soup', 18.00, NULL, true, 1),
('Sopas', 'Sopa de Camarones', 'Shrimp Soup', 22.00, NULL, true, 2),
('Sopas', 'Sopa de Mariscos', 'Seafood Soup', 26.00, NULL, true, 3),
('Sopas', 'Asopao de Pollo', 'Chicken Rice Soup', 18.00, NULL, true, 4),
('Sopas', 'Asopao de Camarones', 'Shrimp Rice Soup', 24.00, NULL, true, 5),

-- ACOMPAÑAMIENTOS
('Acompañamientos', 'Tostones', 'Fried Plantains', 5.00, NULL, true, 1),
('Acompañamientos', 'Maduro', 'Sweet Plantains', 5.00, NULL, true, 2),
('Acompañamientos', 'Papas Fritas', 'French Fries', 5.00, NULL, true, 3),
('Acompañamientos', 'Arroz', 'Rice', 5.00, NULL, true, 4),
('Acompañamientos', 'Moro', 'Rice Mixed with Beans', 6.00, NULL, true, 5),
('Acompañamientos', 'Puré de Papa', 'Mashed Potatoes', 8.00, NULL, true, 6),
('Acompañamientos', 'Vegetales', 'Vegetables', 8.00, NULL, true, 7),

-- BATIDAS
('Batidas', 'Batida de Lechosa', 'Papaya Shake', 6.00, NULL, true, 1),
('Batidas', 'Batida de Chocolate', 'Chocolate Shake', 6.00, NULL, true, 2),
('Batidas', 'Batida de Fresa', 'Strawberry Shake', 6.00, NULL, true, 3),
('Batidas', 'Batida de Guineo', 'Banana Shake', 6.00, NULL, true, 4),
('Batidas', 'Batida de Vainilla', 'Vanilla Shake', 6.00, NULL, true, 5),
('Batidas', 'Batidas Mixtas', 'Mixed Shakes', 8.00, NULL, true, 6),

-- JUGOS NATURALES
('Jugos Naturales', 'Limonada', 'Lemonade', 5.00, NULL, true, 1),
('Jugos Naturales', 'Parcha', 'Passion Fruit', 5.00, NULL, true, 2),
('Jugos Naturales', 'Naranja', 'Orange', 5.50, NULL, true, 3),
('Jugos Naturales', 'Morir Soñando', 'Orange and Milk', 6.00, NULL, true, 4),

-- BEBIDAS
('Bebidas', 'Café', 'Coffee', 1.00, NULL, true, 1),
('Bebidas', 'Té', 'Tea', 1.50, NULL, true, 2),
('Bebidas', 'Chocolate', 'Hot Chocolate', 2.00, NULL, true, 3),
('Bebidas', 'Leche', 'Milk', 1.50, NULL, true, 4),
('Bebidas', 'Soda en Lata', 'Soda Can', 1.50, NULL, true, 5),
('Bebidas', 'Country Club', 'Soda', 2.50, NULL, true, 6),
('Bebidas', 'Snapple', 'Snapple', 2.50, NULL, true, 7),
('Bebidas', 'Soda 2 Litros', '2 Liter Soda', 4.00, NULL, true, 8),

-- POSTRES
('Postres', 'Gelatina', 'Jello', 2.50, NULL, true, 1),
('Postres', 'Dulce de Leche', 'Sweet Milk Pudding', 5.00, NULL, true, 2),
('Postres', 'Flan', 'Custard', 5.00, NULL, true, 3),
('Postres', 'Flan de Coco', 'Coconut Custard', 5.00, NULL, true, 4),
('Postres', 'Cheesecake', 'Cheesecake', 5.00, NULL, true, 5),
('Postres', 'Tres Leches', 'Three Milk Cake', 6.00, NULL, true, 6),
('Postres', 'Cuatro Leches', 'Four Milk Cake', 7.00, NULL, true, 7),

-- CATERING (precio app = mediano; tamaños en descripción)
('Catering', 'Res (Catering)', 'Stew Beef. Peq $44.99 · Med $79.99 · Gde $139.99', 79.99, NULL, true, 1),
('Catering', 'BBQ Costillas', 'BBQ Spare Ribs. Peq $49.99 · Med $89.99 · Gde $149.99', 89.99, NULL, true, 2),
('Catering', 'Pernil (Catering)', 'Roast Pork. Peq $49.99 · Med $99.99 · Gde $149.99', 99.99, NULL, true, 3),
('Catering', 'Filetillo de Bistec', 'Pepper Steak. Peq $49.99 · Med $89.99 · Gde $149.99', 89.99, NULL, true, 4),
('Catering', 'Bake Ziti', 'Peq $39.99 · Med $79.99 · Gde $119.99', 79.99, NULL, true, 5),
('Catering', 'Lasaña', 'Lasagna. Peq $59.99 · Med $79.99 · Gde $139.99', 79.99, NULL, true, 6),
('Catering', 'Filetillo de Pollo', 'Pepper Chicken. Peq $49.99 · Med $89.99 · Gde $149.99', 89.99, NULL, true, 7),
('Catering', 'Chicharrón de Pollo (Catering)', 'Peq $44.99 · Med $79.99 · Gde $149.99', 79.99, NULL, true, 8),
('Catering', 'Pollo al Caldero (Catering)', 'Chicken Casserole. Peq $39.99 · Med $79.99 · Gde $134.99', 79.99, NULL, true, 9),
('Catering', 'Arroz Blanco', 'White Rice. Peq $34.99 · Med $49.99 · Gde $84.99', 49.99, NULL, true, 10),
('Catering', 'Arroz Amarillo', 'Yellow Rice. Peq $34.99 · Med $54.99 · Gde $99.99', 54.99, NULL, true, 11),
('Catering', 'Moro (Catering)', 'Rice w/ Beans. Peq $44.99 · Med $59.99 · Gde $119.99', 59.99, NULL, true, 12),
('Catering', 'Yuca', 'Cassava. Peq $29.99 · Med $49.99 · Gde $84.99', 49.99, NULL, true, 13),
('Catering', 'Guineo', 'Plantain. Peq $29.99 · Med $49.99 · Gde $84.99', 49.99, NULL, true, 14),
('Catering', 'Papas Fritas (Catering)', 'French Fries. Peq $39.99 · Med $49.99 · Gde $74.99', 49.99, NULL, true, 15),
('Catering', 'Tostones (Catering)', 'Peq $39.99 · Med $49.99 · Gde $79.99', 49.99, NULL, true, 16),
('Catering', 'Maduros (Catering)', 'Sweet Plantain. Peq $44.99 · Med $64.99 · Gde $99.99', 64.99, NULL, true, 17),
('Catering', 'Pastelón de Maduros', 'Peq $59.99 · Med $89.99 · Gde $139.99', 89.99, NULL, true, 18),
('Catering', 'Pastelón de Papa', 'Peq $59.99 · Med $79.99 · Gde $139.99', 79.99, NULL, true, 19),
('Catering', 'Ensalada de Papa', 'Potato Salad. Peq $39.99 · Med $79.99 · Gde $99.99', 79.99, NULL, true, 20),
('Catering', 'Ensalada Verde', 'Green Salad. Peq $29.99 · Med $49.99 · Gde $79.99', 49.99, NULL, true, 21),
('Catering', 'Ensalada de Coditos', 'Elbow Salad. Peq $29.99 · Med $44.99 · Gde $74.99', 44.99, NULL, true, 22),
('Catering', 'Parrillada', 'Peq $74.99 · Med $109.99 · Gde $199.99', 109.99, NULL, true, 23),
('Catering', 'Picadera Frita', 'Peq $44.99 · Med $79.99 · Gde $109.99', 79.99, NULL, true, 24),
('Catering', 'Berenjena (Catering)', 'Eggplant. Peq $54.99 · Med $84.99 · Gde $119.99', 84.99, NULL, true, 25),
('Catering', 'Espaguetis', 'Spaghetti. Peq $39.99 · Med $59.99 · Gde $79.99', 59.99, NULL, true, 26),
('Catering', 'Paella (Catering)', 'Peq $69.99 · Med $119.99 · Gde $199.99', 119.99, NULL, true, 27),
('Catering', 'Rabo Guisado (Catering)', 'Stew Oxtail. Peq $64.99 · Med $119.99 · Gde $199.99', 119.99, NULL, true, 28);
