import { config } from './config';

export function formatPrice(amount: number, currency: string = config.currency): string {
  try {
    return new Intl.NumberFormat(config.locale, {
      style: 'currency',
      currency,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${currency} ${amount.toFixed(2)}`;
  }
}
