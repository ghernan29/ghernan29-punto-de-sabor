import { unstable_noStore as noStore } from "next/cache"

import { createSupabasePublicClient } from "@/lib/supabase"
import type { BusinessInfoRow, MenuItemRow } from "@/types/database"

type QueryResult<T> = {
  data: T
  error: string | null
  missingConfig?: boolean
}

export async function getMenuItems(): Promise<QueryResult<MenuItemRow[]>> {
  noStore()

  const supabase = createSupabasePublicClient()

  if (!supabase) {
    return {
      data: [],
      error: "Configura Supabase para cargar el menu en tiempo real.",
      missingConfig: true,
    }
  }

  const { data, error } = await supabase
    .from("menu_items")
    .select(
      "id, category, name, description, price, image_url, is_available, sort_order, created_at, updated_at",
    )
    .order("category", { ascending: true })
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true })

  if (error) {
    return { data: [], error: error.message }
  }

  return { data: data ?? [], error: null }
}

export async function getBusinessInfo(): Promise<QueryResult<BusinessInfoRow | null>> {
  noStore()

  const supabase = createSupabasePublicClient()

  if (!supabase) {
    return {
      data: null,
      error: "Configura Supabase para cargar la informacion del negocio.",
      missingConfig: true,
    }
  }

  const { data, error } = await supabase
    .from("business_info")
    .select(
      "id, business_name, description, hours, address, map_embed_url, phone, instagram_url, facebook_url, tiktok_url, created_at, updated_at",
    )
    .limit(1)
    .maybeSingle()

  if (error) {
    return { data: null, error: error.message }
  }

  return { data, error: null }
}
