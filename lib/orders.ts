import { supabase } from "@/lib/supabase";
import type { OrderInsert } from "@/lib/types";

export async function createOrder(order: OrderInsert): Promise<{ id: string }> {
  if (!supabase) {
    throw new Error("Supabase no está configurado.");
  }

  const { data, error } = await supabase
    .from("orders")
    .insert({
      customer_name: order.customer_name,
      customer_phone: order.customer_phone,
      delivery_address: order.delivery_address,
      notes: order.notes,
      fulfillment: order.fulfillment,
      items_json: order.items_json,
      subtotal: order.subtotal,
      delivery_fee: order.delivery_fee,
      total: order.total,
      status: "pending",
    })
    .select("id")
    .single();

  if (error) throw error;
  return { id: data.id };
}
