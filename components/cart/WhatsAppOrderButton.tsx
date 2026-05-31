"use client";

import { useCart, useCartTotals } from "@/context/CartContext";
import { buildWhatsAppMessage, openWhatsApp } from "@/lib/whatsapp";
import { formatPrice } from "@/lib/format";

type WhatsAppOrderButtonProps = {
  fulfillment?: "delivery" | "pickup";
  className?: string;
};

export function WhatsAppOrderButton({
  fulfillment = "pickup",
  className = "",
}: WhatsAppOrderButtonProps) {
  const { lines, meetsMinimum, minimumOrder } = useCart();
  const { subtotal, deliveryFee, total } = useCartTotals(fulfillment);

  if (lines.length === 0) return null;

  const handleClick = () => {
    const message = buildWhatsAppMessage(lines, {
      subtotal,
      deliveryFee,
      total,
      fulfillment,
    });
    openWhatsApp(message);
  };

  return (
    <div className="space-y-2">
      {!meetsMinimum && (
        <p className="text-center text-xs text-amber-700">
          Pedido mínimo: {formatPrice(minimumOrder)} (faltan{" "}
          {formatPrice(minimumOrder - subtotal)})
        </p>
      )}
      <button
        type="button"
        onClick={handleClick}
        disabled={!meetsMinimum}
        className={`flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3 font-semibold text-white transition hover:bg-[#1da851] disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      >
        <span>💬</span>
        Pedir por WhatsApp
      </button>
    </div>
  );
}
