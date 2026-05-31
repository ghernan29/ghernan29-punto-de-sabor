"use client";

import { MessageCircle } from "lucide-react";

import { createQuickWhatsAppUrl } from "@/lib/whatsapp";

export function FloatingWhatsAppButton() {
  return (
    <a
      href={createQuickWhatsAppUrl()}
      target="_blank"
      rel="noreferrer"
      aria-label="Escribir por WhatsApp"
      className="fixed bottom-24 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-green-500 text-white shadow-xl shadow-green-900/20 transition hover:scale-105 hover:bg-green-600 md:bottom-6 md:right-6"
    >
      <MessageCircle size={28} aria-hidden="true" />
    </a>
  );
}
