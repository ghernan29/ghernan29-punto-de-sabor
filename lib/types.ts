export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      menu_items: {
        Row: {
          id: string;
          category: string;
          name: string;
          description: string;
          price: number;
          image_url: string | null;
          is_available: boolean;
          sort_order: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          category: string;
          name: string;
          description: string;
          price: number;
          image_url?: string | null;
          is_available?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          category?: string;
          name?: string;
          description?: string;
          price?: number;
          image_url?: string | null;
          is_available?: boolean;
          sort_order?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      business_info: {
        Row: {
          id: string;
          business_name: string;
          description: string;
          hours: Json;
          address: string;
          map_embed_url: string | null;
          phone: string;
          instagram_url: string | null;
          facebook_url: string | null;
          tiktok_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          business_name?: string;
          description: string;
          hours?: Json;
          address: string;
          map_embed_url?: string | null;
          phone: string;
          instagram_url?: string | null;
          facebook_url?: string | null;
          tiktok_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          business_name?: string;
          description?: string;
          hours?: Json;
          address?: string;
          map_embed_url?: string | null;
          phone?: string;
          instagram_url?: string | null;
          facebook_url?: string | null;
          tiktok_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      orders: {
        Row: {
          id: string;
          customer_name: string;
          customer_phone: string;
          delivery_type: "delivery" | "pickup";
          delivery_address: string | null;
          notes: string | null;
          items: Json;
          subtotal: number;
          delivery_fee: number;
          total: number;
          status: "pending_whatsapp" | "confirmed" | "cancelled" | "completed";
          created_at: string;
        };
        Insert: {
          id?: string;
          customer_name: string;
          customer_phone: string;
          delivery_type: "delivery" | "pickup";
          delivery_address?: string | null;
          notes?: string | null;
          items: Json;
          subtotal: number;
          delivery_fee: number;
          total: number;
          status?: "pending_whatsapp" | "confirmed" | "cancelled" | "completed";
          created_at?: string;
        };
        Update: {
          id?: string;
          customer_name?: string;
          customer_phone?: string;
          delivery_type?: "delivery" | "pickup";
          delivery_address?: string | null;
          notes?: string | null;
          items?: Json;
          subtotal?: number;
          delivery_fee?: number;
          total?: number;
          status?: "pending_whatsapp" | "confirmed" | "cancelled" | "completed";
          created_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type MenuItem = Database["public"]["Tables"]["menu_items"]["Row"];
export type BusinessInfo = Database["public"]["Tables"]["business_info"]["Row"];
export type OrderInsert = Database["public"]["Tables"]["orders"]["Insert"];

export type CartItem = Pick<MenuItem, "id" | "name" | "price" | "image_url" | "category"> & {
  quantity: number;
};

export type DeliveryType = "delivery" | "pickup";
