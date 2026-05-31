import { formatCurrency } from "@/lib/currency";
import { publicConfig } from "@/lib/config";
import type { CartItem } from "@/lib/cart-context";

type CustomerDetails = {
  name: string;
  phone: string;
  orderType: "delivery" | "pickup";
  address?: string;
  notes?: string;
};

const sanitizePhone = (raw: string): string => raw.replace(/[^\d]/g, "");

export const getWhatsappBaseUrl = (): string => {
  const number = sanitizePhone(publicConfig.whatsappNumber);
  if (!number) return "#";
  return `https://wa.me/${number}`;
};

export const createOrderWhatsappMessage = ({
  items,
  subtotal,
  deliveryFee,
  total,
  customer
}: {
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  customer?: CustomerDetails;
}): string => {
  const lines = [
    `Hola ${publicConfig.businessName}, quiero hacer este pedido:`,
    "",
    ...items.map(
      (item) =>
        `- ${item.quantity} x ${item.name} (${formatCurrency(item.price * item.quantity)})`
    ),
    "",
    `Subtotal: ${formatCurrency(subtotal)}`,
    `Domicilio: ${formatCurrency(deliveryFee)}`,
    `Total: ${formatCurrency(total)}`
  ];

  if (customer) {
    lines.push(
      "",
      "Datos del cliente:",
      `Nombre: ${customer.name}`,
      `Telefono: ${customer.phone}`,
      `Tipo de pedido: ${customer.orderType === "delivery" ? "Domicilio" : "Recoger en local"}`
    );

    if (customer.orderType === "delivery" && customer.address) {
      lines.push(`Direccion: ${customer.address}`);
    }
    if (customer.notes) {
      lines.push(`Notas: ${customer.notes}`);
    }
  }

  return lines.join("\n");
};

export const createWhatsappOrderLink = (message: string): string => {
  const baseUrl = getWhatsappBaseUrl();
  if (baseUrl === "#") return "#";
  return `${baseUrl}?text=${encodeURIComponent(message)}`;
};
