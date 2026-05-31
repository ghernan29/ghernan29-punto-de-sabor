import { NextResponse } from "next/server"

import { createSupabaseAdminClient } from "@/lib/supabase"
import type { OrderInsert } from "@/types/database"

type CreateOrderRequest = {
  customerName?: string
  phone?: string
  deliveryAddress?: string | null
  deliveryFee?: number
  items?: unknown[]
  notes?: string | null
  orderType?: "delivery" | "pickup"
  subtotal?: number
  total?: number
  whatsappMessage?: string
}

export async function POST(request: Request) {
  const supabase = createSupabaseAdminClient()

  if (!supabase) {
    return NextResponse.json(
      {
        error:
          "Falta configurar SUPABASE_SERVICE_ROLE_KEY para guardar pedidos.",
      },
      { status: 500 },
    )
  }

  const payload = (await request.json()) as CreateOrderRequest

  if (
    !payload.customerName ||
    !payload.phone ||
    !payload.orderType ||
    !Array.isArray(payload.items) ||
    payload.items.length === 0 ||
    typeof payload.subtotal !== "number" ||
    typeof payload.total !== "number" ||
    typeof payload.deliveryFee !== "number" ||
    !payload.whatsappMessage
  ) {
    return NextResponse.json(
      { error: "Datos del pedido incompletos." },
      { status: 400 },
    )
  }

  if (payload.orderType === "delivery" && !payload.deliveryAddress) {
    return NextResponse.json(
      { error: "La direccion es obligatoria para domicilio." },
      { status: 400 },
    )
  }

  const orderToInsert: OrderInsert = {
    customer_name: payload.customerName,
    phone: payload.phone,
    order_type: payload.orderType,
    delivery_address:
      payload.orderType === "delivery" ? payload.deliveryAddress ?? "" : null,
    notes: payload.notes ?? null,
    subtotal: payload.subtotal,
    delivery_fee: payload.deliveryFee,
    total: payload.total,
    items: payload.items,
    whatsapp_message: payload.whatsappMessage,
    status: "pending",
  }

  const { data, error } = await supabase
    .from("orders")
    .insert(orderToInsert)
    .select("id")
    .single()

  if (error) {
    return NextResponse.json(
      { error: `No se pudo guardar el pedido: ${error.message}` },
      { status: 500 },
    )
  }

  return NextResponse.json({ ok: true, id: data.id })
}
