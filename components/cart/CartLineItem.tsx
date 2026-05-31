"use client";

import Image from "next/image";
import type { CartLine } from "@/lib/types";
import { formatPrice } from "@/lib/format";
import { useCart } from "@/context/CartContext";

type CartLineItemProps = {
  line: CartLine;
};

export function CartLineItem({ line }: CartLineItemProps) {
  const { setQuantity, removeItem } = useCart();

  return (
    <li className="flex gap-3 rounded-2xl bg-white p-3 shadow-sm ring-1 ring-sage-100">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-sage-100">
        {line.imageUrl ? (
          <Image
            src={line.imageUrl}
            alt=""
            fill
            className="object-cover"
            sizes="64px"
          />
        ) : (
          <span className="flex h-full items-center justify-center text-xl">
            🍽️
          </span>
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-2">
          <p className="font-semibold text-sage-800">{line.name}</p>
          <p className="shrink-0 text-sm font-semibold text-brand-700">
            {formatPrice(line.price * line.quantity)}
          </p>
        </div>
        <p className="text-xs text-sage-600">
          {formatPrice(line.price)} c/u
        </p>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setQuantity(line.menuItemId, line.quantity - 1)}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-sage-100 text-lg font-medium text-sage-800 hover:bg-sage-200"
              aria-label="Disminuir cantidad"
            >
              −
            </button>
            <span className="min-w-[1.5rem] text-center font-semibold">
              {line.quantity}
            </span>
            <button
              type="button"
              onClick={() => setQuantity(line.menuItemId, line.quantity + 1)}
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-100 text-lg font-medium text-brand-800 hover:bg-brand-200"
              aria-label="Aumentar cantidad"
            >
              +
            </button>
          </div>
          <button
            type="button"
            onClick={() => removeItem(line.menuItemId)}
            className="text-xs text-red-600 hover:underline"
          >
            Quitar
          </button>
        </div>
      </div>
    </li>
  );
}
