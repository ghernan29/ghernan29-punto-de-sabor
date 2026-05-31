"use client"

import { useMemo } from "react"
import { Clock3, Truck } from "lucide-react"

import { MenuItemCard } from "@/components/menu-item-card"
import { useCart } from "@/lib/cart-context"
import { formatCurrency } from "@/lib/format"
import type { BusinessInfoRow, MenuItemRow } from "@/types/database"

type MenuPageContentProps = {
  items: MenuItemRow[]
  businessInfo: BusinessInfoRow | null
}

export function MenuPageContent({
  items,
  businessInfo,
}: MenuPageContentProps) {
  const { deliveryFee, minOrderAmount } = useCart()

  const groupedItems = useMemo(() => {
    return items.reduce<Record<string, MenuItemRow[]>>((groups, item) => {
      if (!groups[item.category]) {
        groups[item.category] = []
      }

      groups[item.category].push(item)
      return groups
    }, {})
  }, [items])

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] bg-hero-gradient p-6 shadow-soft">
        <div className="space-y-4">
          <span className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">
            Punto de Sabor
          </span>

          <div className="space-y-3">
            <h1 className="text-3xl font-bold tracking-tight text-slate-950">
              Menu fresco, antojado y listo para pedir
            </h1>
            <p className="max-w-2xl text-sm leading-7 text-slate-600">
              Explora nuestras entradas, platos fuertes, bebidas y postres.
              Agrega al carrito y confirma tu pedido por WhatsApp en pocos
              pasos.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/70 bg-white/80 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <Truck className="h-4 w-4 text-brand-700" />
                Domicilios y recogida
              </div>
              <p className="mt-2 text-sm text-slate-600">
                Domicilio fijo de {formatCurrency(deliveryFee)} y pedido minimo
                de {formatCurrency(minOrderAmount)}.
              </p>
            </div>

            <div className="rounded-3xl border border-white/70 bg-white/80 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                <Clock3 className="h-4 w-4 text-brand-700" />
                Horario de hoy
              </div>
              <p className="mt-2 text-sm text-slate-600">
                {businessInfo?.hours ?? "Configura tu horario desde Supabase."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {Object.entries(groupedItems).map(([category, categoryItems]) => (
        <section key={category} className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold text-slate-950">{category}</h2>
            <p className="text-sm text-slate-500">
              Preparado al momento con el sabor de la casa.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {categoryItems.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
