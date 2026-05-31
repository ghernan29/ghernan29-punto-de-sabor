import type { BusinessInfo, MenuItem } from "./types";

/**
 * Bundled sample data mirroring the Supabase seed. Used as a fallback so the
 * app renders meaningfully before the database is connected.
 */
export const sampleMenuItems: MenuItem[] = [
  {
    id: "11111111-1111-1111-1111-111111111101",
    category: "Entradas",
    name: "Guacamole con totopos",
    description: "Aguacate fresco, cilantro, cebolla y limón con totopos crujientes.",
    price: 85,
    image_url:
      "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=800&q=70",
    is_available: true,
    sort_order: 1,
  },
  {
    id: "11111111-1111-1111-1111-111111111102",
    category: "Entradas",
    name: "Sopa de tortilla",
    description: "Caldo de jitomate con tiras de tortilla, aguacate, queso y chile pasilla.",
    price: 75,
    image_url:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=800&q=70",
    is_available: true,
    sort_order: 2,
  },
  {
    id: "11111111-1111-1111-1111-111111111201",
    category: "Platos Fuertes",
    name: "Tacos al pastor (orden)",
    description: "Cuatro tacos de cerdo marinado con piña, cebolla y cilantro.",
    price: 120,
    image_url:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=70",
    is_available: true,
    sort_order: 1,
  },
  {
    id: "11111111-1111-1111-1111-111111111202",
    category: "Platos Fuertes",
    name: "Enchiladas verdes",
    description: "Tortillas rellenas de pollo bañadas en salsa verde, crema y queso.",
    price: 135,
    image_url:
      "https://images.unsplash.com/photo-1534352956036-cd81e27dd615?auto=format&fit=crop&w=800&q=70",
    is_available: true,
    sort_order: 2,
  },
  {
    id: "11111111-1111-1111-1111-111111111203",
    category: "Platos Fuertes",
    name: "Mole poblano con arroz",
    description: "Pechuga de pollo en mole tradicional con ajonjolí y arroz rojo.",
    price: 160,
    image_url:
      "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&w=800&q=70",
    is_available: false,
    sort_order: 3,
  },
  {
    id: "11111111-1111-1111-1111-111111111301",
    category: "Bebidas",
    name: "Agua de horchata",
    description: "Bebida de arroz con canela, dulce y refrescante. 500 ml.",
    price: 35,
    image_url:
      "https://images.unsplash.com/photo-1497534446932-c925b458314a?auto=format&fit=crop&w=800&q=70",
    is_available: true,
    sort_order: 1,
  },
  {
    id: "11111111-1111-1111-1111-111111111302",
    category: "Bebidas",
    name: "Agua de jamaica",
    description: "Flor de jamaica natural, ligeramente endulzada. 500 ml.",
    price: 35,
    image_url:
      "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?auto=format&fit=crop&w=800&q=70",
    is_available: true,
    sort_order: 2,
  },
  {
    id: "11111111-1111-1111-1111-111111111303",
    category: "Bebidas",
    name: "Refresco de botella",
    description: "Coca-Cola, Sidral o agua mineral. 355 ml.",
    price: 28,
    image_url:
      "https://images.unsplash.com/photo-1581636625402-29b2a704ef13?auto=format&fit=crop&w=800&q=70",
    is_available: true,
    sort_order: 3,
  },
  {
    id: "11111111-1111-1111-1111-111111111401",
    category: "Postres",
    name: "Flan napolitano",
    description: "Flan casero cremoso con caramelo. Porción individual.",
    price: 55,
    image_url:
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=70",
    is_available: true,
    sort_order: 1,
  },
  {
    id: "11111111-1111-1111-1111-111111111402",
    category: "Postres",
    name: "Churros con cajeta",
    description: "Churros recién hechos espolvoreados con azúcar y cajeta.",
    price: 60,
    image_url:
      "https://images.unsplash.com/photo-1624471339379-3e1f87a13e8a?auto=format&fit=crop&w=800&q=70",
    is_available: true,
    sort_order: 2,
  },
];

export const sampleBusinessInfo: BusinessInfo = {
  id: "00000000-0000-0000-0000-000000000001",
  name: "Punto de Sabor",
  description:
    "En Punto de Sabor preparamos comida mexicana casera con ingredientes frescos todos los días. Disfruta de nuestros platillos en el local o pídelos a domicilio.",
  hours: [
    { day: "Lunes", open: "09:00", close: "20:00" },
    { day: "Martes", open: "09:00", close: "20:00" },
    { day: "Miércoles", open: "09:00", close: "20:00" },
    { day: "Jueves", open: "09:00", close: "20:00" },
    { day: "Viernes", open: "09:00", close: "22:00" },
    { day: "Sábado", open: "10:00", close: "22:00" },
    { day: "Domingo", open: "10:00", close: "18:00" },
  ],
  address: "Av. Reforma 123, Col. Centro, Ciudad de México",
  map_embed_url:
    "https://www.google.com/maps?q=Avenida%20Reforma%20Centro%20Ciudad%20de%20Mexico&output=embed",
  phone: "+52 55 1234 5678",
  whatsapp_number: "",
  instagram_url: "https://instagram.com/puntodesabor",
  facebook_url: "https://facebook.com/puntodesabor",
  tiktok_url: "https://tiktok.com/@puntodesabor",
};
