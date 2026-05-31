import type { CartLine } from "@/lib/types";
import { config } from "@/lib/config";
import { formatPrice } from "@/lib/format";

export type WhatsAppOrderContext = {
  customerName?: string;
  customerPhone?: string;
  deliveryAddress?: string;
  notes?: string;
  fulfillment?: "delivery" | "pickup";
  subtotal: number;
  deliveryFee: number;
  total: number;
};

function fulfillmentLabel(fulfillment?: "delivery" | "pickup"): string {
  if (fulfillment === "pickup") return "Recoger en local";
  return "Entrega a domicilio";
}

export function buildWhatsAppMessage(
  lines: CartLine[],
  ctx: WhatsAppOrderContext
): string {
  const header = "🍽️ *Nuevo pedido — Punto de Sabor*\n\n";

  const itemsBlock = lines
    .map(
      (line) =>
        `• ${line.quantity}x ${line.name} — ${formatPrice(line.price * line.quantity)}`
    )
    .join("\n");

  const parts: string[] = [header, "*Pedido:*", itemsBlock, ""];

  if (ctx.customerName) {
    parts.push(`*Nombre:* ${ctx.customerName}`);
  }
  if (ctx.customerPhone) {
    parts.push(`*Teléfono:* ${ctx.customerPhone}`);
  }
  if (ctx.fulfillment) {
    parts.push(`*Tipo:* ${fulfillmentLabel(ctx.fulfillment)}`);
  }
  if (ctx.deliveryAddress) {
    parts.push(`*Dirección:* ${ctx.deliveryAddress}`);
  }
  if (ctx.notes) {
    parts.push(`*Notas:* ${ctx.notes}`);
  }

  parts.push("");
  parts.push(`Subtotal: ${formatPrice(ctx.subtotal)}`);
  if (ctx.deliveryFee > 0) {
    parts.push(`Envío: ${formatPrice(ctx.deliveryFee)}`);
  }
  parts.push(`*Total: ${formatPrice(ctx.total)}*`);

  return parts.join("\n");
}

export function getWhatsAppUrl(message: string): string {
  const number = config.whatsappNumber.replace(/\D/g, "");
  if (!number) {
    return "#";
  }
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${number}?text=${encoded}`;
}

export function openWhatsApp(message: string): void {
  const url = getWhatsAppUrl(message);
  if (url === "#") return;
  window.open(url, "_blank", "noopener,noreferrer");
}
