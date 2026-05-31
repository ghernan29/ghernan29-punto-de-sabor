"use client";

import { Minus, Plus, Trash2 } from "lucide-react";

import { useCart } from "@/components/cart-provider";
import { formatMoney } from "@/lib/config";
import type { CartItem } from "@/lib/types";

export function CartLineItem({ item }: { item: CartItem }) {
  const { increaseItem, decreaseItem, removeItem } = useCart();

  return (
    <article className="flex gap-4 rounded-[1.5rem] border border-orange-100 bg-white p-4 shadow-sm">
      <div className="h-20 w-20 overflow-hidden rounded-2xl bg-orange-100">
        {item.image_url ? (
          <img src={item.image_url} alt={item.name} className="h-full w-full object-cover" />
        ) : null}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="font-black text-stone-950">{item.name}</p>
            <p className="text-sm text-stone-500">{formatMoney(item.price)} c/u</p>
          </div>
          <button
            type="button"
            onClick={() => removeItem(item.id)}
            className="rounded-full p-2 text-stone-400 hover:bg-red-50 hover:text-red-600"
            aria-label={`Quitar ${item.name}`}
          >
            <Trash2 size={17} aria-hidden="true" />
          </button>
        </div>
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center rounded-full border border-orange-100 bg-amber-50">
            <button
              type="button"
              onClick={() => decreaseItem(item.id)}
              className="p-2 text-orange-700"
              aria-label={`Disminuir ${item.name}`}
            >
              <Minus size={16} aria-hidden="true" />
            </button>
            <span className="w-8 text-center text-sm font-black text-stone-950">{item.quantity}</span>
            <button
              type="button"
              onClick={() => increaseItem(item.id)}
              className="p-2 text-orange-700"
              aria-label={`Aumentar ${item.name}`}
            >
              <Plus size={16} aria-hidden="true" />
            </button>
          </div>
          <p className="font-black text-orange-800">{formatMoney(item.price * item.quantity)}</p>
        </div>
      </div>
    </article>
  );
}
