export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      business_info: {
        Row: {
          address: string;
          business_name: string;
          description: string;
          facebook_url: string | null;
          hours: string;
          id: number;
          instagram_url: string | null;
          map_embed_url: string | null;
          phone: string;
          tiktok_url: string | null;
          updated_at: string;
        };
        Insert: {
          address: string;
          business_name?: string;
          description: string;
          facebook_url?: string | null;
          hours: string;
          id?: number;
          instagram_url?: string | null;
          map_embed_url?: string | null;
          phone: string;
          tiktok_url?: string | null;
          updated_at?: string;
        };
        Update: {
          address?: string;
          business_name?: string;
          description?: string;
          facebook_url?: string | null;
          hours?: string;
          id?: number;
          instagram_url?: string | null;
          map_embed_url?: string | null;
          phone?: string;
          tiktok_url?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      menu_items: {
        Row: {
          category: string;
          created_at: string;
          description: string;
          id: string;
          image_url: string | null;
          is_available: boolean;
          name: string;
          price: number;
          sort_order: number;
        };
        Insert: {
          category: string;
          created_at?: string;
          description: string;
          id?: string;
          image_url?: string | null;
          is_available?: boolean;
          name: string;
          price: number;
          sort_order?: number;
        };
        Update: {
          category?: string;
          created_at?: string;
          description?: string;
          id?: string;
          image_url?: string | null;
          is_available?: boolean;
          name?: string;
          price?: number;
          sort_order?: number;
        };
        Relationships: [];
      };
      orders: {
        Row: {
          created_at: string;
          customer_name: string;
          customer_phone: string;
          delivery_address: string | null;
          delivery_fee: number;
          id: string;
          notes: string | null;
          order_type: "delivery" | "pickup";
          status: string;
          subtotal: number;
          total: number;
          items: Json;
        };
        Insert: {
          created_at?: string;
          customer_name: string;
          customer_phone: string;
          delivery_address?: string | null;
          delivery_fee?: number;
          id?: string;
          items: Json;
          notes?: string | null;
          order_type: "delivery" | "pickup";
          status?: string;
          subtotal: number;
          total: number;
        };
        Update: {
          created_at?: string;
          customer_name?: string;
          customer_phone?: string;
          delivery_address?: string | null;
          delivery_fee?: number;
          id?: string;
          items?: Json;
          notes?: string | null;
          order_type?: "delivery" | "pickup";
          status?: string;
          subtotal?: number;
          total?: number;
        };
        Relationships: [];
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
