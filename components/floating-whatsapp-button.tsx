import { MessageCircleMore } from "lucide-react";

import { createWhatsappOrderLink } from "@/lib/whatsapp";

export const FloatingWhatsappButton = () => {
  const href = createWhatsappOrderLink("Hola, quiero hacer un pedido en Punto de Sabor.");

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-28 right-5 z-50 flex items-center gap-2 rounded-full bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-emerald-600"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircleMore className="h-5 w-5" />
      WhatsApp
    </a>
  );
};
