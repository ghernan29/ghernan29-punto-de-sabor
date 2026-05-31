"use client";

import { formatPrice } from "@/lib/format";

type CartSummaryProps = {
  subtotal: number;
  deliveryFee: number;
  total: number;
  showDeliveryFee: boolean;
};

export function CartSummary({
  subtotal,
  deliveryFee,
  total,
  showDeliveryFee,
}: CartSummaryProps) {
  return (
    <div className="space-y-2 rounded-2xl bg-white p-4 text-sm shadow-sm ring-1 ring-sage-100">
      <div className="flex justify-between text-sage-600">
        <span>Subtotal</span>
        <span>{formatPrice(subtotal)}</span>
      </div>
      {showDeliveryFee && deliveryFee > 0 && (
        <div className="flex justify-between text-sage-600">
          <span>Envío</span>
          <span>{formatPrice(deliveryFee)}</span>
        </div>
      )}
      <div className="flex justify-between border-t border-sage-100 pt-2 text-base font-bold text-sage-800">
        <span>Total</span>
        <span className="text-brand-700">{formatPrice(total)}</span>
      </div>
    </div>
  );
}
