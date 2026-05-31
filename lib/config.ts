export const config = {
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
  deliveryFee: Number(process.env.NEXT_PUBLIC_DELIVERY_FEE ?? "0"),
  minimumOrder: Number(process.env.NEXT_PUBLIC_MINIMUM_ORDER ?? "0"),
  siteName: "Punto de Sabor",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
};

export function isSupabaseConfigured(): boolean {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}
