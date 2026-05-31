import { getPublicAppConfig } from "@/lib/config"

export function formatCurrency(value: number) {
  const { locale, currencyCode } = getPublicAppConfig()

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: 2,
  }).format(value)
}
