import { formatCurrency } from "@/lib/format"
import { getPublicAppConfig } from "@/lib/config"
import type { CartItem, CheckoutFormValues, OrderType } from "@/types/app"

type OrderSummaryInput = {
  items: CartItem[]
  subtotal: number
  deliveryFee: number
  total: number
  orderType: OrderType
  customer?: Pick<CheckoutFormValues, "name" | "phone" | "address" | "notes">
}

export function buildWhatsappMessage({
  items,
  subtotal,
  deliveryFee,
  total,
  orderType,
  customer,
}: OrderSummaryInput) {
  const lines = [
    "Hola Punto de Sabor, quiero confirmar este pedido:",
    "",
    ...items.map(
      (item) =>
        `- ${item.quantity} x ${item.name} (${formatCurrency(
          item.price,
        )}) = ${formatCurrency(item.price * item.quantity)}`,
    ),
    "",
    `Subtotal: ${formatCurrency(subtotal)}`,
    `Tipo: ${orderType === "delivery" ? "Domicilio" : "Recoger en local"}`,
    ...(orderType === "delivery"
      ? [`Domicilio: ${formatCurrency(deliveryFee)}`]
      : []),
    `Total: ${formatCurrency(total)}`,
  ]

  if (customer) {
    lines.push(
      "",
      "Datos del cliente:",
      `Nombre: ${customer.name}`,
      `Telefono: ${customer.phone}`,
    )

    if (orderType === "delivery") {
      lines.push(`Direccion: ${customer.address}`)
    }

    if (customer.notes) {
      lines.push(`Notas: ${customer.notes}`)
    }
  }

  return lines.join("\n")
}

export function buildWhatsappLink(message: string) {
  const { whatsappNumber } = getPublicAppConfig()

  if (!whatsappNumber) {
    return ""
  }

  const cleanNumber = whatsappNumber.replace(/[^\d]/g, "")
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`
}
