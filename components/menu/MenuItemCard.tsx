"use client";

import Image from "next/image";
import type { MenuItem } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/context/CartContext";

type MenuItemCardProps = {
  item: MenuItem;
};

export function MenuItemCard({ item }: MenuItemCardProps) {
  const { addItem } = useCart();
  const unavailable = !item.is_available;

  return (
    <article
      className={`overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-sage-100 ${
        unavailable ? "opacity-75" : ""
      }`}
    >
      <div className="relative aspect-[16/10] w-full bg-sage-100">
        {item.image_url ? (
          <Image
            src={item.image_url}
            alt={item.name}
            fill
            className="object-cover"
            sizes="(max-width: 512px) 100vw, 512px"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-4xl opacity-40">
            🍽️
          </div>
        )}
        {unavailable && (
          <span className="absolute left-3 top-3 rounded-full bg-sage-800/90 px-3 py-1 text-xs font-semibold text-white">
            Agotado
          </span>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display text-lg font-semibold text-sage-800">
            {item.name}
          </h3>
          <span className="shrink-0 font-semibold text-brand-700">
            {formatPrice(item.price)}
          </span>
        </div>
        {item.description && (
          <p className="mt-1 text-sm leading-relaxed text-sage-600">
            {item.description}
          </p>
        )}
        <button
          type="button"
          disabled={unavailable}
          onClick={() => addItem(item)}
          className="mt-3 w-full rounded-xl bg-brand-600 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:bg-sage-200 disabled:text-sage-600"
        >
          {unavailable ? "No disponible" : "Agregar"}
        </button>
      </div>
    </article>
  );
}
