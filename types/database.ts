export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      business_info: {
        Row: {
          address: string
          business_name: string
          created_at: string
          description: string
          facebook_url: string | null
          hours: string
          id: string
          instagram_url: string | null
          map_embed_url: string | null
          phone: string
          tiktok_url: string | null
          updated_at: string
        }
        Insert: {
          address: string
          business_name?: string
          created_at?: string
          description: string
          facebook_url?: string | null
          hours: string
          id?: string
          instagram_url?: string | null
          map_embed_url?: string | null
          phone: string
          tiktok_url?: string | null
          updated_at?: string
        }
        Update: {
          address?: string
          business_name?: string
          created_at?: string
          description?: string
          facebook_url?: string | null
          hours?: string
          id?: string
          instagram_url?: string | null
          map_embed_url?: string | null
          phone?: string
          tiktok_url?: string | null
          updated_at?: string
        }
      }
      menu_items: {
        Row: {
          category: string
          created_at: string
          description: string
          id: string
          image_url: string | null
          is_available: boolean
          name: string
          price: number
          sort_order: number
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          description: string
          id?: string
          image_url?: string | null
          is_available?: boolean
          name: string
          price: number
          sort_order?: number
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          id?: string
          image_url?: string | null
          is_available?: boolean
          name?: string
          price?: number
          sort_order?: number
          updated_at?: string
        }
      }
      orders: {
        Row: {
          created_at: string
          customer_name: string
          delivery_address: string | null
          delivery_fee: number
          id: string
          items: Json
          notes: string | null
          order_type: "delivery" | "pickup"
          phone: string
          status: string
          subtotal: number
          total: number
          whatsapp_message: string
        }
        Insert: {
          created_at?: string
          customer_name: string
          delivery_address?: string | null
          delivery_fee?: number
          id?: string
          items: Json
          notes?: string | null
          order_type: "delivery" | "pickup"
          phone: string
          status?: string
          subtotal: number
          total: number
          whatsapp_message: string
        }
        Update: {
          created_at?: string
          customer_name?: string
          delivery_address?: string | null
          delivery_fee?: number
          id?: string
          items?: Json
          notes?: string | null
          order_type?: "delivery" | "pickup"
          phone?: string
          status?: string
          subtotal?: number
          total?: number
          whatsapp_message?: string
        }
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
    CompositeTypes: Record<string, never>
  }
}

export type BusinessInfoRow = Database["public"]["Tables"]["business_info"]["Row"]
export type MenuItemRow = Database["public"]["Tables"]["menu_items"]["Row"]
export type OrderInsert = Database["public"]["Tables"]["orders"]["Insert"]
