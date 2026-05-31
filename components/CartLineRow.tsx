"use client";

import Image from "next/image";
import { useCart, type CartLine } from "@/lib/cart";
import { formatCurrency } from "@/lib/config";
import { MinusIcon, PlusIcon, TrashIcon } from "./icons";

export default function CartLineRow({ line }: { line: CartLine }) {
  const increment = useCart((s) => s.increment);
  const decrement = useCart((s) => s.decrement);
  const removeItem = useCart((s) => s.removeItem);

  return (
    <div className="flex items-center gap-3 py-3">
      <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-lg bg-stone-100">
        {line.image_url ? (
          <Image
            src={line.image_url}
            alt={line.name}
            fill
            sizes="56px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">🍴</div>
        )}
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-ink">{line.name}</p>
        <p className="text-sm text-stone-500">{formatCurrency(line.price)}</p>
      </div>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={() => decrement(line.id)}
          aria-label="Quitar uno"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-300 text-stone-600 active:scale-95"
        >
          <MinusIcon className="h-4 w-4" />
        </button>
        <span className="w-6 text-center text-sm font-bold">{line.quantity}</span>
        <button
          type="button"
          onClick={() => increment(line.id)}
          aria-label="Agregar uno"
          className="flex h-8 w-8 items-center justify-center rounded-full border border-stone-300 text-stone-600 active:scale-95"
        >
          <PlusIcon className="h-4 w-4" />
        </button>
      </div>

      <button
        type="button"
        onClick={() => removeItem(line.id)}
        aria-label="Eliminar del carrito"
        className="ml-1 flex h-8 w-8 items-center justify-center rounded-full text-stone-400 hover:text-red-500 active:scale-95"
      >
        <TrashIcon className="h-4 w-4" />
      </button>
    </div>
  );
}
