import { supabase } from "@/lib/supabase";
import type { MenuItem } from "@/lib/types";

export const CATEGORY_ORDER = [
  "Entradas",
  "Platos Fuertes",
  "Bebidas",
  "Postres",
] as const;

export function groupMenuByCategory(items: MenuItem[]): Map<string, MenuItem[]> {
  const grouped = new Map<string, MenuItem[]>();

  for (const item of items) {
    const list = grouped.get(item.category) ?? [];
    list.push(item);
    grouped.set(item.category, list);
  }

  grouped.forEach((list) => {
    list.sort((a, b) => a.sort_order - b.sort_order);
  });

  const ordered = new Map<string, MenuItem[]>();
  for (const cat of CATEGORY_ORDER) {
    if (grouped.has(cat)) {
      ordered.set(cat, grouped.get(cat)!);
      grouped.delete(cat);
    }
  }
  grouped.forEach((list, cat) => {
    ordered.set(cat, list);
  });

  return ordered;
}

export async function fetchMenuItems(): Promise<MenuItem[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("menu_items")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) throw error;

  return (data ?? []).map((row) => ({
    id: row.id,
    category: row.category,
    name: row.name,
    description: row.description,
    price: Number(row.price),
    image_url: row.image_url,
    is_available: row.is_available,
    sort_order: row.sort_order,
  }));
}
