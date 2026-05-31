import { getSupabase } from "./supabase";
import { sampleBusinessInfo, sampleMenuItems } from "./sampleData";
import type { BusinessInfo, MenuItem, Order } from "./types";

/**
 * Fetch all menu items ordered by category and sort_order.
 * Falls back to bundled sample data when Supabase is not configured.
 */
export async function getMenuItems(): Promise<MenuItem[]> {
  const supabase = getSupabase();
  if (!supabase) return sampleMenuItems;

  const { data, error } = await supabase
    .from("menu_items")
    .select("*")
    .order("category", { ascending: true })
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("getMenuItems error:", error.message);
    return sampleMenuItems;
  }
  return data ?? [];
}

/**
 * Fetch the single business info record.
 */
export async function getBusinessInfo(): Promise<BusinessInfo | null> {
  const supabase = getSupabase();
  if (!supabase) return sampleBusinessInfo;

  const { data, error } = await supabase
    .from("business_info")
    .select("*")
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error("getBusinessInfo error:", error.message);
    return sampleBusinessInfo;
  }
  return data ?? sampleBusinessInfo;
}

export type CreateOrderResult =
  | { ok: true; persisted: boolean; id: string | null }
  | { ok: false; error: string };

/**
 * Persist an order to Supabase. When Supabase is not configured the order is
 * not persisted but the flow still succeeds so the WhatsApp message can open.
 */
export async function createOrder(order: Order): Promise<CreateOrderResult> {
  const supabase = getSupabase();
  if (!supabase) {
    return { ok: true, persisted: false, id: null };
  }

  const { data, error } = await supabase
    .from("orders")
    .insert({
      customer_name: order.customer_name,
      customer_phone: order.customer_phone,
      delivery_method: order.delivery_method,
      address: order.address,
      notes: order.notes,
      items: order.items,
      subtotal: order.subtotal,
      delivery_fee: order.delivery_fee,
      total: order.total,
    })
    .select("id")
    .single();

  if (error) {
    return { ok: false, error: error.message };
  }
  return { ok: true, persisted: true, id: data?.id ?? null };
}
