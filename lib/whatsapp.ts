import { config } from './config';
import { formatPrice } from './format';
import type { OrderItem, OrderType } from './types';

export interface BuildWhatsAppMessageArgs {
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  type?: OrderType;
  customerName?: string;
  customerPhone?: string;
  address?: string | null;
  notes?: string | null;
  businessName?: string;
  currency?: string;
}

/**
 * Construye el texto del pedido para enviar por WhatsApp.
 * Salida (ejemplo):
 *
 *   *Pedido — Punto de Sabor*
 *
 *   • 2× Tacos al pastor — $290.00
 *   • 1× Agua fresca de jamaica — $55.00
 *
 *   Subtotal: $345.00
 *   Envío: $35.00
 *   *Total: $380.00*
 *
 *   Nombre: Ana López
 *   Tel: 55 9876 5432
 *   Entrega a domicilio
 *   Dirección: Calle Pino 42, Col. Roma
 *   Notas: sin cebolla
 */
export function buildWhatsAppMessage(args: BuildWhatsAppMessageArgs): string {
  const {
    items,
    subtotal,
    deliveryFee,
    total,
    type = 'delivery',
    customerName,
    customerPhone,
    address,
    notes,
    businessName = config.businessName,
    currency = config.currency,
  } = args;

  const lines: string[] = [];
  lines.push(`*Pedido — ${businessName}*`);
  lines.push('');

  if (items.length === 0) {
    lines.push('_(carrito vacío)_');
  } else {
    for (const item of items) {
      lines.push(`• ${item.quantity}× ${item.name} — ${formatPrice(item.subtotal, currency)}`);
    }
  }

  lines.push('');
  lines.push(`Subtotal: ${formatPrice(subtotal, currency)}`);
  if (type === 'delivery' && deliveryFee > 0) {
    lines.push(`Envío: ${formatPrice(deliveryFee, currency)}`);
  }
  lines.push(`*Total: ${formatPrice(total, currency)}*`);

  const extras: string[] = [];
  if (customerName) extras.push(`Nombre: ${customerName}`);
  if (customerPhone) extras.push(`Tel: ${customerPhone}`);
  extras.push(type === 'delivery' ? 'Entrega a domicilio' : 'Recoger en sucursal');
  if (type === 'delivery' && address) extras.push(`Dirección: ${address}`);
  if (notes) extras.push(`Notas: ${notes}`);

  if (extras.length > 0) {
    lines.push('');
    lines.push(...extras);
  }

  return lines.join('\n');
}

export function buildWhatsAppUrl(
  message: string,
  phoneNumber: string = config.whatsappNumber
): string {
  const cleaned = (phoneNumber || '').replace(/\D/g, '');
  const text = encodeURIComponent(message);
  if (!cleaned) {
    // Sin número configurado: enviamos a wa.me/ y el usuario elige contacto.
    return `https://wa.me/?text=${text}`;
  }
  return `https://wa.me/${cleaned}?text=${text}`;
}
