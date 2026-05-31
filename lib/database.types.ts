export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      menu_items: {
        Row: {
          id: string;
          category: string;
          name: string;
          description: string | null;
          price: number;
          image_url: string | null;
          is_available: boolean;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          category: string;
          name: string;
          description?: string | null;
          price: number;
          image_url?: string | null;
          is_available?: boolean;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          category?: string;
          name?: string;
          description?: string | null;
          price?: number;
          image_url?: string | null;
          is_available?: boolean;
          sort_order?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      business_info: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          hours_json: Json;
          address: string | null;
          map_embed_url: string | null;
          phone: string | null;
          instagram_url: string | null;
          facebook_url: string | null;
          tiktok_url: string | null;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name?: string;
          description?: string | null;
          hours_json?: Json;
          address?: string | null;
          map_embed_url?: string | null;
          phone?: string | null;
          instagram_url?: string | null;
          facebook_url?: string | null;
          tiktok_url?: string | null;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          hours_json?: Json;
          address?: string | null;
          map_embed_url?: string | null;
          phone?: string | null;
          instagram_url?: string | null;
          facebook_url?: string | null;
          tiktok_url?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      orders: {
        Row: {
          id: string;
          customer_name: string;
          customer_phone: string;
          delivery_address: string | null;
          notes: string | null;
          fulfillment: "delivery" | "pickup";
          items_json: Json;
          subtotal: number;
          delivery_fee: number;
          total: number;
          status: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          customer_name: string;
          customer_phone: string;
          delivery_address?: string | null;
          notes?: string | null;
          fulfillment?: "delivery" | "pickup";
          items_json: Json;
          subtotal: number;
          delivery_fee: number;
          total: number;
          status?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          customer_name?: string;
          customer_phone?: string;
          delivery_address?: string | null;
          notes?: string | null;
          fulfillment?: "delivery" | "pickup";
          items_json?: Json;
          subtotal?: number;
          delivery_fee?: number;
          total?: number;
          status?: string;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      order_fulfillment: "delivery" | "pickup";
    };
    CompositeTypes: Record<string, never>;
  };
}
