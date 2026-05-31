"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "@/lib/cart";
import { config } from "@/lib/config";
import { buildWhatsAppLink, buildWhatsAppMessage } from "@/lib/whatsapp";
import { WhatsAppIcon } from "./icons";

export default function WhatsAppContact({
  whatsappNumber,
}: {
  whatsappNumber?: string | null;
}) {
  const lines = useCart((s) => s.lines);
  const subtotal = useCart((s) => s.subtotal());
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const hasCart = mounted && lines.length > 0;

  const open = () => {
    const message = hasCart
      ? buildWhatsAppMessage({ lines, subtotal, deliveryFee: 0, total: subtotal })
      : `¡Hola ${config.businessName}! Me gustaría hacer un pedido.`;
    const link = buildWhatsAppLink(message, whatsappNumber);
    if (!link) return;
    window.open(link, "_blank", "noopener,noreferrer");
  };

  const configured = Boolean((whatsappNumber || "").replace(/\D/g, ""));

  return (
    <div className="space-y-4 py-8">
      <div className="card flex flex-col items-center gap-3 p-8 text-center">
        <span className="flex h-20 w-20 items-center justify-center rounded-full bg-[#25D366]/15 text-[#25D366]">
          <WhatsAppIcon className="h-10 w-10" />
        </span>
        <h1 className="text-2xl font-extrabold">Ordena por WhatsApp</h1>
        <p className="text-sm text-stone-500">
          {hasCart
            ? "Tienes platillos en tu carrito. Envíanos tu pedido directamente por WhatsApp."
            : "Escríbenos directamente para hacer tu pedido o resolver tus dudas."}
        </p>

        {configured ? (
          <button
            type="button"
            onClick={open}
            className="btn-primary mt-2 w-full max-w-xs bg-[#25D366] py-3 text-base hover:bg-[#1fb959]"
          >
            <WhatsAppIcon className="h-5 w-5" />
            {hasCart ? "Enviar mi pedido" : "Abrir WhatsApp"}
          </button>
        ) : (
          <p className="mt-2 rounded-xl bg-amber-100 px-3 py-2 text-xs text-amber-800">
            El número de WhatsApp no está configurado. Define{" "}
            <code>NEXT_PUBLIC_WHATSAPP_NUMBER</code>.
          </p>
        )}

        {hasCart && (
          <Link href="/carrito" className="text-sm font-medium text-brand-700">
            Revisar carrito y datos de entrega
          </Link>
        )}
      </div>
    </div>
  );
}
