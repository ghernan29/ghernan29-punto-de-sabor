import { createClient } from "@supabase/supabase-js"

import { getPublicAppConfig, getServerAppConfig } from "@/lib/config"
import type { Database } from "@/types/database"

function createTypedClient(url: string, key: string) {
  return createClient<Database>(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}

export function createSupabasePublicClient() {
  const { supabaseUrl, supabaseAnonKey } = getPublicAppConfig()

  if (!supabaseUrl || !supabaseAnonKey) {
    return null
  }

  return createTypedClient(supabaseUrl, supabaseAnonKey)
}

export function createSupabaseAdminClient() {
  const { supabaseUrl, supabaseServiceRoleKey } = getServerAppConfig()

  if (!supabaseUrl || !supabaseServiceRoleKey) {
    return null
  }

  return createTypedClient(supabaseUrl, supabaseServiceRoleKey)
}
