import { supabase } from "@/lib/supabase";
import type { Database } from "@/lib/database.types";
import type { BusinessHour, BusinessInfo } from "@/lib/types";

function parseHours(json: unknown): BusinessHour[] {
  if (!Array.isArray(json)) return [];
  return json.filter(
    (h): h is BusinessHour =>
      typeof h === "object" &&
      h !== null &&
      "day" in h &&
      "hours" in h &&
      typeof (h as BusinessHour).day === "string" &&
      typeof (h as BusinessHour).hours === "string"
  );
}

export async function fetchBusinessInfo(): Promise<BusinessInfo | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("business_info")
    .select("*")
    .limit(1)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  const row = data as Database["public"]["Tables"]["business_info"]["Row"];

  return {
    id: row.id,
    name: row.name,
    description: row.description,
    hours_json: parseHours(row.hours_json),
    address: row.address,
    map_embed_url: row.map_embed_url,
    phone: row.phone,
    instagram_url: row.instagram_url,
    facebook_url: row.facebook_url,
    tiktok_url: row.tiktok_url,
  };
}
