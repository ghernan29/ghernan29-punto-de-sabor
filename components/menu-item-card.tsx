"use client";

import Image from "next/image";

import type { MenuItem } from "@/lib/database.types";
import { formatCurrency } from "@/lib/currency";
import { useCart } from "@/lib/cart-context";

type MenuItemCardProps = {
  item: MenuItem;
};

export const MenuItemCard = ({ item }: MenuItemCardProps) => {
  const { addItem } = useCart();
  const isAvailable = item.is_available;

  return (
    <article className="card overflow-hidden p-0">
      <div className="relative h-40 w-full bg-orange-100">
        {item.image_url ? (
          <Image
            src={item.image_url}
            alt={item.name}
            fill
            className={`object-cover ${!isAvailable ? "grayscale" : ""}`}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-slate-500">
            Imagen no disponible
          </div>
        )}
        {!isAvailable ? (
          <span className="absolute left-3 top-3 rounded-full bg-slate-900 px-2 py-1 text-xs font-semibold text-white">
            Agotado
          </span>
        ) : null}
      </div>
      <div className="space-y-3 p-4">
        <div className="space-y-1">
          <h3 className="text-base font-semibold">{item.name}</h3>
          <p className="text-sm text-slate-600">{item.description}</p>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="text-lg font-bold text-orange-700">{formatCurrency(Number(item.price))}</span>
          <button
            type="button"
            onClick={() => addItem(item)}
            disabled={!isAvailable}
            className="rounded-full bg-orange-600 px-4 py-2 text-sm font-semibold text-white transition enabled:hover:bg-orange-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Agregar
          </button>
        </div>
      </div>
    </article>
  );
};
