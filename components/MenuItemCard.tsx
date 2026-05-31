"use client";

import Image from "next/image";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { formatCurrency } from "@/lib/config";
import type { MenuItem } from "@/lib/types";
import { PlusIcon } from "./icons";

export default function MenuItemCard({ item }: { item: MenuItem }) {
  const addItem = useCart((s) => s.addItem);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (!item.is_available) return;
    addItem(item);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  };

  return (
    <article className="card flex gap-3 overflow-hidden p-3">
      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-stone-100">
        {item.image_url ? (
          <Image
            src={item.image_url}
            alt={item.name}
            fill
            sizes="96px"
            className={`object-cover ${item.is_available ? "" : "grayscale"}`}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-2xl">
            🍴
          </div>
        )}
        {!item.is_available && (
          <span className="absolute left-1 top-1 rounded-full bg-stone-900/80 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
            Agotado
          </span>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <h3 className="truncate text-base font-bold text-ink">{item.name}</h3>
        {item.description && (
          <p className="mt-0.5 line-clamp-2 text-sm text-stone-500">
            {item.description}
          </p>
        )}
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-base font-extrabold text-brand-700">
            {formatCurrency(item.price)}
          </span>
          <button
            type="button"
            onClick={handleAdd}
            disabled={!item.is_available}
            className="btn-primary px-3 py-2 text-xs"
          >
            <PlusIcon className="h-4 w-4" />
            {item.is_available ? (added ? "Agregado" : "Agregar") : "Agotado"}
          </button>
        </div>
      </div>
    </article>
  );
}
