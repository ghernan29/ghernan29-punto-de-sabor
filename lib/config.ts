/**
 * Centralized, type-safe access to public runtime configuration.
 * All values are exposed to the browser, so only use NEXT_PUBLIC_* vars here.
 */

function num(value: string | undefined, fallback: number): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export const config = {
  /** WhatsApp number in international format, digits only (e.g. 5215512345678). */
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
  /** Flat delivery fee added to delivery orders. */
  deliveryFee: num(process.env.NEXT_PUBLIC_DELIVERY_FEE, 35),
  /** Minimum order subtotal required to checkout. */
  minimumOrder: num(process.env.NEXT_PUBLIC_MINIMUM_ORDER, 100),
  /** Currency symbol used across the UI. */
  currencySymbol: process.env.NEXT_PUBLIC_CURRENCY_SYMBOL ?? "$",
  /** ISO currency code for Intl formatting. */
  currencyCode: process.env.NEXT_PUBLIC_CURRENCY_CODE ?? "MXN",
  /** Locale used for number/currency formatting. */
  locale: process.env.NEXT_PUBLIC_LOCALE ?? "es-MX",
  /** Public business display name. */
  businessName: process.env.NEXT_PUBLIC_BUSINESS_NAME ?? "Punto de Sabor",
} as const;

export function formatCurrency(amount: number): string {
  try {
    return new Intl.NumberFormat(config.locale, {
      style: "currency",
      currency: config.currencyCode,
      minimumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${config.currencySymbol}${amount.toFixed(2)}`;
  }
}
