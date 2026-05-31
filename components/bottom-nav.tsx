"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutGrid, ShoppingBag, Store, MessageCircle } from "lucide-react"

import { buildWhatsappLink } from "@/lib/whatsapp"
import { cn } from "@/lib/utils"

const navItems = [
  {
    href: "/menu",
    label: "Menu",
    icon: LayoutGrid,
    isExternal: false,
  },
  {
    href: "/pedidos",
    label: "Carrito",
    icon: ShoppingBag,
    isExternal: false,
  },
  {
    href: "/pagina",
    label: "Pagina",
    icon: Store,
    isExternal: false,
  },
  {
    href: buildWhatsappLink("Hola Punto de Sabor, quiero hacer un pedido."),
    label: "WhatsApp",
    icon: MessageCircle,
    isExternal: true,
  },
] as const

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-orange-100 bg-white/95 backdrop-blur">
      <div className="mx-auto grid max-w-3xl grid-cols-4 px-2 pb-[max(env(safe-area-inset-bottom),0.65rem)] pt-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive =
            !item.isExternal &&
            (pathname === item.href || pathname.startsWith(`${item.href}/`))

          const baseClasses =
            "flex min-h-[4.25rem] flex-col items-center justify-center gap-1 rounded-2xl text-xs font-medium transition"

          const content = (
            <>
              <Icon className="h-5 w-5" />
              <span>{item.label}</span>
            </>
          )

          if (item.isExternal) {
            return (
              <a
                key={item.label}
                href={item.href || "#"}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  baseClasses,
                  "text-slate-500 hover:bg-orange-50 hover:text-brand-700",
                )}
              >
                {content}
              </a>
            )
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                baseClasses,
                isActive
                  ? "bg-orange-50 text-brand-700"
                  : "text-slate-500 hover:bg-orange-50 hover:text-brand-700",
              )}
            >
              {content}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
