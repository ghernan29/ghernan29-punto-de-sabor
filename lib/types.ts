export type MenuItem = {
  id: string;
  category: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  is_available: boolean;
  sort_order: number;
};

export type BusinessHour = {
  day: string;
  hours: string;
};

export type BusinessInfo = {
  id: string;
  name: string;
  description: string | null;
  hours_json: BusinessHour[];
  address: string | null;
  map_embed_url: string | null;
  phone: string | null;
  instagram_url: string | null;
  facebook_url: string | null;
  tiktok_url: string | null;
};

export type CartLine = {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string | null;
};

export type OrderFulfillment = "delivery" | "pickup";

export type OrderItemPayload = {
  menu_item_id: string;
  name: string;
  price: number;
  quantity: number;
};

export type OrderInsert = {
  customer_name: string;
  customer_phone: string;
  delivery_address: string | null;
  notes: string | null;
  fulfillment: OrderFulfillment;
  items_json: OrderItemPayload[];
  subtotal: number;
  delivery_fee: number;
  total: number;
};
