const defaultDeliveryFee = 4.5
const defaultMinOrderAmount = 15
const defaultLocale = "es-CO"
const defaultCurrencyCode = "USD"

function parseNumber(value: string | undefined, fallback: number) {
  if (!value) {
    return fallback
  }

  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : fallback
}

export function getPublicAppConfig() {
  return {
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "",
    deliveryFee: parseNumber(
      process.env.NEXT_PUBLIC_DELIVERY_FEE,
      defaultDeliveryFee,
    ),
    minOrderAmount: parseNumber(
      process.env.NEXT_PUBLIC_MIN_ORDER_AMOUNT,
      defaultMinOrderAmount,
    ),
    locale: process.env.NEXT_PUBLIC_LOCALE ?? defaultLocale,
    currencyCode:
      process.env.NEXT_PUBLIC_CURRENCY_CODE ?? defaultCurrencyCode,
  }
}

export function getServerAppConfig() {
  return {
    ...getPublicAppConfig(),
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
  }
}
