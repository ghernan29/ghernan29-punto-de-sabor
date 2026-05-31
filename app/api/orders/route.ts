import { NextResponse } from "next/server";

import { createSupabaseClient } from "@/lib/supabase";
import type { DeliveryType, OrderInsert } from "@/lib/types";

type OrderPayload = Partial<OrderInsert>;

export async function POST(request: Request) {
  const supabase = createSupabaseClient();

  if (!supabase) {
    return NextResponse.json({ error: "Supabase no esta configurado." }, { status: 500 });
  }

  let payload: OrderPayload;

  try {
    payload = (await request.json()) as OrderPayload;
  } catch {
    return NextResponse.json({ error: "El pedido no tiene un formato valido." }, { status: 400 });
  }

  const validationError = validateOrder(payload);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const order: OrderInsert = {
    customer_name: payload.customer_name!.trim(),
    customer_phone: payload.customer_phone!.trim(),
    delivery_type: payload.delivery_type as DeliveryType,
    delivery_address: payload.delivery_address?.trim() || null,
    notes: payload.notes?.trim() || null,
    items: payload.items!,
    subtotal: Number(payload.subtotal),
    delivery_fee: Number(payload.delivery_fee),
    total: Number(payload.total),
    status: "pending_whatsapp"
  };

  const { data, error } = await supabase.from("orders").insert(order).select("id").single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ id: data.id });
}

function validateOrder(payload: OrderPayload) {
  if (!payload.customer_name?.trim()) {
    return "El nombre es obligatorio.";
  }

  if (!payload.customer_phone?.trim()) {
    return "El telefono es obligatorio.";
  }

  if (payload.delivery_type !== "delivery" && payload.delivery_type !== "pickup") {
    return "El tipo de entrega no es valido.";
  }

  if (payload.delivery_type === "delivery" && !payload.delivery_address?.trim()) {
    return "La direccion es obligatoria para entregas.";
  }

  if (!Array.isArray(payload.items) || payload.items.length === 0) {
    return "El pedido no tiene productos.";
  }

  if (!isValidAmount(payload.subtotal) || !isValidAmount(payload.delivery_fee) || !isValidAmount(payload.total)) {
    return "Los totales del pedido no son validos.";
  }

  return null;
}

function isValidAmount(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) && value >= 0;
}
