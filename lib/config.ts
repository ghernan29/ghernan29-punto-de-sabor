/**
 * Configuración derivada de variables de entorno (NEXT_PUBLIC_*).
 * Centraliza valores por defecto para que el resto de la app pueda
 * funcionar incluso si Supabase aún no tiene un registro de business_info.
 */

export const config = {
  businessName: process.env.NEXT_PUBLIC_BUSINESS_NAME || 'Punto de Sabor',
  whatsappNumber: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '').replace(/\D/g, ''),
  deliveryFee: numberFromEnv(process.env.NEXT_PUBLIC_DELIVERY_FEE, 0),
  minOrder: numberFromEnv(process.env.NEXT_PUBLIC_MIN_ORDER, 0),
  currency: process.env.NEXT_PUBLIC_CURRENCY || 'MXN',
  locale: process.env.NEXT_PUBLIC_LOCALE || 'es-MX',
};

function numberFromEnv(value: string | undefined, fallback: number): number {
  if (!value) return fallback;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}
