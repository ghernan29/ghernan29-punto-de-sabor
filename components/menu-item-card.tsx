import { AddToCartButton } from "@/components/add-to-cart-button";
import { formatMoney } from "@/lib/config";
import type { MenuItem } from "@/lib/types";

export function MenuItemCard({ item }: { item: MenuItem }) {
  return (
    <article className="overflow-hidden rounded-[2rem] border border-orange-100 bg-white shadow-sm shadow-orange-100/70">
      <div className="relative h-44 bg-gradient-to-br from-orange-100 to-amber-50">
        {item.image_url ? (
          <img src={item.image_url} alt={item.name} className="h-full w-full object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center px-6 text-center text-sm font-semibold text-orange-700">
            Foto de {item.name}
          </div>
        )}
        {!item.is_available ? (
          <span className="absolute right-4 top-4 rounded-full bg-stone-950/85 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
            Agotado
          </span>
        ) : null}
      </div>
      <div className="space-y-4 p-5">
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-lg font-black text-stone-950">{item.name}</h3>
            <p className="shrink-0 rounded-full bg-amber-100 px-3 py-1 text-sm font-black text-orange-800">
              {formatMoney(item.price)}
            </p>
          </div>
          <p className="text-sm leading-6 text-stone-600">{item.description}</p>
        </div>
        <AddToCartButton item={item} />
      </div>
    </article>
  );
}
