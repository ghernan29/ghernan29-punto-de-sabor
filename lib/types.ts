export type MenuCategory =
  | "Entradas"
  | "Platos Fuertes"
  | "Bebidas"
  | "Postres"
  | string;

// Note: these are declared as `type` (not `interface`) so they satisfy the
// `Record<string, unknown>` constraint that supabase-js requires for the typed
// Database schema. Interfaces lack an implicit index signature and would fail.
export type MenuItem = {
  id: string;
  category: MenuCategory;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  is_available: boolean;
  sort_order: number;
  created_at?: string;
};

export type BusinessInfo = {
  id: string;
  name: string;
  description: string | null;
  hours: BusinessHours[] | null;
  address: string | null;
  map_embed_url: string | null;
  phone: string | null;
  whatsapp_number: string | null;
  instagram_url: string | null;
  facebook_url: string | null;
  tiktok_url: string | null;
  updated_at?: string;
};

export type BusinessHours = {
  day: string;
  open: string;
  close: string;
  closed?: boolean;
};

export type DeliveryMethod = "delivery" | "pickup";

export type OrderItemSnapshot = {
  id: string;
  name: string;
  price: number;
  quantity: number;
};

export type Order = {
  id?: string;
  customer_name: string;
  customer_phone: string;
  delivery_method: DeliveryMethod;
  address: string | null;
  notes: string | null;
  items: OrderItemSnapshot[];
  subtotal: number;
  delivery_fee: number;
  total: number;
  status?: string;
  created_at?: string;
};

/**
 * Minimal database shape used for type-safe Supabase queries.
 */
export interface Database {
  public: {
    Tables: {
      menu_items: {
        Row: MenuItem;
        Insert: Omit<MenuItem, "id" | "created_at"> & { id?: string };
        Update: Partial<MenuItem>;
        Relationships: [];
      };
      business_info: {
        Row: BusinessInfo;
        Insert: Omit<BusinessInfo, "id" | "updated_at"> & { id?: string };
        Update: Partial<BusinessInfo>;
        Relationships: [];
      };
      orders: {
        Row: Order & { id: string; created_at: string; status: string };
        Insert: Omit<Order, "id" | "created_at" | "status"> & {
          id?: string;
          status?: string;
        };
        Update: Partial<Order>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
