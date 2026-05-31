const moneyFormatter = new Intl.NumberFormat("es-MX", {
  style: "currency",
  currency: "MXN"
});

export const appConfig = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  whatsappNumber: normalizePhone(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ""),
  deliveryFee: readNumber(process.env.NEXT_PUBLIC_DELIVERY_FEE, 0),
  minimumOrderAmount: readNumber(process.env.NEXT_PUBLIC_MIN_ORDER_AMOUNT, 0),
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
};

export function hasSupabaseConfig() {
  return Boolean(appConfig.supabaseUrl && appConfig.supabaseAnonKey);
}

export function hasWhatsappConfig() {
  return Boolean(appConfig.whatsappNumber);
}

export function formatMoney(value: number) {
  return moneyFormatter.format(value);
}

function normalizePhone(value: string) {
  return value.replace(/[^\d]/g, "");
}

function readNumber(value: string | undefined, fallback: number) {
  if (!value) {
    return fallback;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}
