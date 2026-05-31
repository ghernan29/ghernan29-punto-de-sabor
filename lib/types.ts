export type CategorySlug = string;

export type Category = {
  id: string;
  slug: CategorySlug;
  name: string;
  sort_order: number;
  created_at: string;
};

export type MenuItem = {
  id: string;
  category: CategorySlug;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  is_available: boolean;
  sort_order: number;
  created_at: string;
  updated_at: string;
};

export type BusinessHour = {
  day: string;
  open: string;
  close: string;
  closed: boolean;
};

export type BusinessInfo = {
  id: number;
  name: string;
  tagline: string | null;
  description: string | null;
  address: string | null;
  map_embed_url: string | null;
  phone: string | null;
  whatsapp_number: string | null;
  email: string | null;
  instagram_url: string | null;
  facebook_url: string | null;
  tiktok_url: string | null;
  hours: BusinessHour[];
  delivery_fee: number;
  min_order: number;
  currency: string;
  updated_at: string;
};

export type OrderType = 'delivery' | 'pickup';

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'on_the_way'
  | 'delivered'
  | 'cancelled';

export type OrderItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  subtotal: number;
};

export type OrderInsert = {
  customer_name: string;
  customer_phone: string;
  type: OrderType;
  address: string | null;
  notes: string | null;
  items: OrderItem[];
  subtotal: number;
  delivery_fee: number;
  total: number;
};

// Tipos para el cliente tipado de Supabase
export type Database = {
  public: {
    Tables: {
      categories: {
        Row: Category;
        Insert: Omit<Category, 'id' | 'created_at'> & {
          id?: string;
          created_at?: string;
        };
        Update: Partial<Category>;
        Relationships: [];
      };
      menu_items: {
        Row: MenuItem;
        Insert: Omit<MenuItem, 'id' | 'created_at' | 'updated_at'> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<MenuItem>;
        Relationships: [];
      };
      business_info: {
        Row: BusinessInfo;
        Insert: Partial<BusinessInfo> & { id?: number };
        Update: Partial<BusinessInfo>;
        Relationships: [];
      };
      orders: {
        Row: OrderInsert & {
          id: string;
          status: OrderStatus;
          created_at: string;
        };
        Insert: OrderInsert & {
          id?: string;
          status?: OrderStatus;
          created_at?: string;
        };
        Update: Partial<OrderInsert> & { status?: OrderStatus };
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: {
      order_type: OrderType;
      order_status: OrderStatus;
    };
    CompositeTypes: { [_ in never]: never };
  };
};
