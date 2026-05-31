"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { config } from "@/lib/config";
import { buildWhatsAppLink, buildWhatsAppMessage } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./icons";

export default function WhatsAppFloat({
  numberOverride,
}: {
  numberOverride?: string | null;
}) {
  const lines = useCart((s) => s.lines);
  const subtotal = useCart((s) => s.subtotal());
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const handleClick = () => {
    const message =
      mounted && lines.length > 0
        ? buildWhatsAppMessage({
            lines,
            subtotal,
            deliveryFee: 0,
            total: subtotal,
          })
        : `¡Hola ${config.businessName}! Me gustaría hacer un pedido.`;
    const link = buildWhatsAppLink(message, numberOverride);
    if (!link) {
      alert(
        "El número de WhatsApp aún no está configurado. Agrega NEXT_PUBLIC_WHATSAPP_NUMBER."
      );
      return;
    }
    window.open(link, "_blank", "noopener,noreferrer");
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Ordenar por WhatsApp"
      className="fixed bottom-24 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition active:scale-95 hover:brightness-105"
    >
      <WhatsAppIcon className="h-7 w-7" />
    </button>
  );
}
