"use client"

import Image from "next/image"
import { Plus, ShoppingBag } from "lucide-react"

import { useCart } from "@/lib/cart-context"
import { formatCurrency } from "@/lib/format"
import type { MenuItemRow } from "@/types/database"

type MenuItemCardProps = {
  item: MenuItemRow
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  const { addItem } = useCart()

  return (
    <article className="overflow-hidden rounded-[2rem] border border-orange-100 bg-white shadow-soft">
      <div className="relative h-48 w-full bg-orange-100">
        {item.image_url ? (
          <Image
            src={item.image_url}
            alt={item.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm font-medium text-brand-700">
            Imagen pendiente
          </div>
        )}

        {!item.is_available && (
          <span className="absolute left-4 top-4 rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white">
            Agotado
          </span>
        )}
      </div>

      <div className="space-y-4 p-5">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-lg font-semibold text-slate-900">{item.name}</h3>
            <span className="rounded-full bg-orange-50 px-3 py-1 text-sm font-semibold text-brand-700">
              {formatCurrency(item.price)}
            </span>
          </div>

          <p className="text-sm leading-6 text-slate-600">{item.description}</p>
        </div>

        <button
          type="button"
          onClick={() => addItem(item)}
          disabled={!item.is_available}
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500"
        >
          {item.is_available ? (
            <>
              <Plus className="h-4 w-4" />
              Agregar
            </>
          ) : (
            <>
              <ShoppingBag className="h-4 w-4" />
              No disponible
            </>
          )}
        </button>
      </div>
    </article>
  )
}
