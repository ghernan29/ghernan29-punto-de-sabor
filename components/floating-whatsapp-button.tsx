"use client"

import { MessageCircleMore } from "lucide-react"

import { buildWhatsappLink } from "@/lib/whatsapp"

export function FloatingWhatsAppButton() {
  const href = buildWhatsappLink("Hola Punto de Sabor, quiero consultar el menu.")

  if (!href) {
    return null
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Abrir WhatsApp"
      className="fixed bottom-32 right-4 z-40 inline-flex h-14 w-14 items-center justify-center rounded-full bg-accent-500 text-white shadow-soft transition hover:scale-105 hover:bg-accent-600 sm:right-6"
    >
      <MessageCircleMore className="h-7 w-7" />
    </a>
  )
}
