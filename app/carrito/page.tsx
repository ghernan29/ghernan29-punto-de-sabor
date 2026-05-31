import type { Metadata } from 'next';
import { CartPageClient } from './CartPageClient';
import { getSupabase, isSupabaseConfigured } from '@/lib/supabase';
import { config } from '@/lib/config';

export const metadata: Metadata = {
  title: 'Tu pedido',
};

export const revalidate = 60;

async function loadBusinessConfig() {
  const fallback = {
    deliveryFee: config.deliveryFee,
    minOrder: config.minOrder,
    currency: config.currency,
    whatsappNumber: config.whatsappNumber,
  };

  if (!isSupabaseConfigured()) return fallback;

  const supabase = getSupabase()!;
  const { data, error } = await supabase
    .from('business_info')
    .select('delivery_fee, min_order, currency, whatsapp_number')
    .eq('id', 1)
    .maybeSingle();

  if (error || !data) return fallback;

  return {
    deliveryFee: Number(data.delivery_fee ?? fallback.deliveryFee),
    minOrder: Number(data.min_order ?? fallback.minOrder),
    currency: data.currency || fallback.currency,
    whatsappNumber: (data.whatsapp_number || fallback.whatsappNumber || '').replace(/\D/g, ''),
  };
}

export default async function CartPage() {
  const cfg = await loadBusinessConfig();
  return <CartPageClient initialConfig={cfg} />;
}
