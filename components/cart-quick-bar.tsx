"use client"

import Link from "next/link"
import { ArrowRight, ShoppingBag } from "lucide-react"

import { useCart } from "@/lib/cart-context"
import { formatCurrency } from "@/lib/format"

export function CartQuickBar() {
  const { hasHydrated, itemCount, total } = useCart()

  if (!hasHydrated || itemCount === 0) {
    return null
  }

  return (
    <div className="fixed inset-x-0 bottom-24 z-30 px-4">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/pedidos"
          className="flex items-center justify-between rounded-3xl bg-slate-950 px-5 py-4 text-white shadow-soft"
        >
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-white/10 p-2">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-medium">{itemCount} productos en tu carrito</p>
              <p className="text-xs text-white/70">Toca para revisar tu pedido</p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm font-semibold">
            <span>{formatCurrency(total)}</span>
            <ArrowRight className="h-4 w-4" />
          </div>
        </Link>
      </div>
    </div>
  )
}
