const parseNumber = (value: string | undefined, fallback: number): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const publicConfig = {
  businessName: process.env.NEXT_PUBLIC_BUSINESS_NAME ?? "Punto de Sabor",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
  deliveryFee: parseNumber(process.env.NEXT_PUBLIC_DELIVERY_FEE, 5),
  minimumOrder: parseNumber(process.env.NEXT_PUBLIC_MIN_ORDER_AMOUNT, 10)
};

export const hasSupabaseConfig =
  Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL) && Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
