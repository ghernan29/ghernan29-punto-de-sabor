import { createClient, SupabaseClient } from '@supabase/supabase-js';
import type { Database } from './types';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 * Cliente Supabase compartido (lado cliente y servidor de Next).
 * Devolvemos `null` cuando faltan las variables de entorno para que la app
 * pueda seguir compilando y mostrando estados vacíos en lugar de crashear.
 */
let _client: SupabaseClient<Database> | null = null;

export function getSupabase(): SupabaseClient<Database> | null {
  if (!url || !anonKey) return null;
  if (!_client) {
    _client = createClient<Database>(url, anonKey, {
      auth: { persistSession: false },
    });
  }
  return _client;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(url && anonKey);
}
