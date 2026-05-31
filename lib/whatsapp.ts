import { appConfig, formatMoney } from "@/lib/config";
import type { CartItem, DeliveryType } from "@/lib/types";

export type CheckoutDetails = {
  customerName: string;
  customerPhone: string;
  deliveryType: DeliveryType;
  deliveryAddress?: string;
  notes?: string;
};

type OrderMessageInput = CheckoutDetails & {
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
};

export function createWhatsAppUrl(message: string, phone = appConfig.whatsappNumber) {
  const number = phone.replace(/[^\d]/g, "");

  if (!number) {
    return "#";
  }

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function createQuickWhatsAppUrl() {
  return createWhatsAppUrl("Hola Punto de Sabor, me gustaría hacer una consulta.");
}

export function buildOrderMessage(order: OrderMessageInput) {
  const lines = [
    "Hola Punto de Sabor, quiero confirmar este pedido:",
    "",
    ...order.items.flatMap((item) => [
      `- ${item.quantity} x ${item.name}`,
      `  Subtotal: ${formatMoney(item.price * item.quantity)}`
    ]),
    "",
    `Subtotal: ${formatMoney(order.subtotal)}`,
    `Envío: ${formatMoney(order.deliveryFee)}`,
    `Total: ${formatMoney(order.total)}`,
    "",
    `Tipo: ${order.deliveryType === "delivery" ? "Entrega a domicilio" : "Recoger en tienda"}`,
    `Nombre: ${order.customerName}`,
    `Teléfono: ${order.customerPhone}`
  ];

  if (order.deliveryType === "delivery" && order.deliveryAddress) {
    lines.push(`Dirección: ${order.deliveryAddress}`);
  }

  if (order.notes) {
    lines.push(`Notas: ${order.notes}`);
  }

  return lines.join("\n");
}
