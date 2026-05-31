import { createSupabaseClient } from "@/lib/supabase";
import type { BusinessInfo, MenuItem } from "@/lib/types";

type QueryResult<T> = {
  data: T;
  error: string | null;
  isConfigured: boolean;
};

const CATEGORY_ORDER = ["Entradas", "Platos Fuertes", "Bebidas", "Postres"];

export async function getMenuItems(): Promise<QueryResult<MenuItem[]>> {
  const supabase = createSupabaseClient();

  if (!supabase) {
    return { data: [], error: null, isConfigured: false };
  }

  const { data, error } = await supabase
    .from("menu_items")
    .select("*")
    .order("category", { ascending: true })
    .order("sort_order", { ascending: true });

  if (error) {
    return { data: [], error: error.message, isConfigured: true };
  }

  return { data: sortMenuItems(data ?? []), error: null, isConfigured: true };
}

export async function getBusinessInfo(): Promise<QueryResult<BusinessInfo | null>> {
  const supabase = createSupabaseClient();

  if (!supabase) {
    return { data: null, error: null, isConfigured: false };
  }

  const { data, error } = await supabase
    .from("business_info")
    .select("*")
    .order("updated_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    return { data: null, error: error.message, isConfigured: true };
  }

  return { data, error: null, isConfigured: true };
}

function sortMenuItems(items: MenuItem[]) {
  return [...items].sort((a, b) => {
    const categoryDelta = categoryRank(a.category) - categoryRank(b.category);
    if (categoryDelta !== 0) {
      return categoryDelta;
    }

    return a.sort_order - b.sort_order || a.name.localeCompare(b.name, "es");
  });
}

function categoryRank(category: string) {
  const index = CATEGORY_ORDER.indexOf(category);
  return index === -1 ? CATEGORY_ORDER.length : index;
}
