import { createClient, SupabaseClient } from "@supabase/supabase-js";
import type { Database } from "./types";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * True when Supabase credentials are present. When false the app falls back to
 * bundled sample data so it stays usable before the database is configured.
 */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

let client: SupabaseClient<Database> | null = null;

/**
 * Returns a typed Supabase client, or null when credentials are missing.
 * Use the null result to trigger sample-data fallbacks in the data layer.
 */
export function getSupabase(): SupabaseClient<Database> | null {
  if (!isSupabaseConfigured) return null;
  if (!client) {
    client = createClient<Database>(supabaseUrl as string, supabaseAnonKey as string, {
      auth: { persistSession: false },
    });
  }
  return client;
}
