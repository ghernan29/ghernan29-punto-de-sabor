import { createClient } from "@supabase/supabase-js";

import { appConfig, hasSupabaseConfig } from "@/lib/config";
import type { Database } from "@/lib/types";

export function createSupabaseClient() {
  if (!hasSupabaseConfig()) {
    return null;
  }

  return createClient<Database>(appConfig.supabaseUrl, appConfig.supabaseAnonKey, {
    auth: {
      persistSession: false
    }
  });
}
