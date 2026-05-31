import { config, formatCurrency } from "./config";
import type { CartLine } from "./cart";
import type { DeliveryMethod } from "./types";

export interface WhatsAppOrderPayload {
  lines: CartLine[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  customerName?: string;
  customerPhone?: string;
  deliveryMethod?: DeliveryMethod;
  address?: string | null;
  notes?: string | null;
}

/**
 * Build the human-readable WhatsApp order message in Spanish.
 */
export function buildWhatsAppMessage(payload: WhatsAppOrderPayload): string {
  const {
    lines,
    subtotal,
    deliveryFee,
    total,
    customerName,
    customerPhone,
    deliveryMethod,
    address,
    notes,
  } = payload;

  const out: string[] = [];
  out.push(`¡Hola ${config.businessName}! Quiero hacer un pedido:`);
  out.push("");

  for (const line of lines) {
    const lineTotal = formatCurrency(line.price * line.quantity);
    out.push(`• ${line.quantity}x ${line.name} — ${lineTotal}`);
  }

  out.push("");
  out.push(`Subtotal: ${formatCurrency(subtotal)}`);
  if (deliveryFee > 0) {
    out.push(`Envío: ${formatCurrency(deliveryFee)}`);
  }
  out.push(`Total: ${formatCurrency(total)}`);

  if (customerName || customerPhone || deliveryMethod) {
    out.push("");
    out.push("--- Datos de entrega ---");
    if (deliveryMethod) {
      out.push(
        `Tipo: ${deliveryMethod === "delivery" ? "Entrega a domicilio" : "Recoger en sucursal"}`
      );
    }
    if (customerName) out.push(`Nombre: ${customerName}`);
    if (customerPhone) out.push(`Teléfono: ${customerPhone}`);
    if (deliveryMethod === "delivery" && address) {
      out.push(`Dirección: ${address}`);
    }
    if (notes) out.push(`Notas: ${notes}`);
  }

  return out.join("\n");
}

/**
 * Build a wa.me link with the URL-encoded message. Returns null when no number
 * is configured.
 */
export function buildWhatsAppLink(
  message: string,
  numberOverride?: string | null
): string | null {
  const raw = (numberOverride || config.whatsappNumber || "").replace(/\D/g, "");
  if (!raw) return null;
  return `https://wa.me/${raw}?text=${encodeURIComponent(message)}`;
}
