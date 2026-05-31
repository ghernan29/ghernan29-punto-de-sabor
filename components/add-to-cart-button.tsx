"use client";

import { Plus } from "lucide-react";

import { useCart } from "@/components/cart-provider";
import type { MenuItem } from "@/lib/types";

export function AddToCartButton({ item }: { item: MenuItem }) {
  const { addItem } = useCart();

  return (
    <button
      type="button"
      onClick={() => addItem(item)}
      disabled={!item.is_available}
      className="inline-flex items-center justify-center gap-2 rounded-full bg-orange-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-orange-700 disabled:cursor-not-allowed disabled:bg-stone-300 disabled:text-stone-600"
    >
      <Plus size={16} aria-hidden="true" />
      {item.is_available ? "Agregar" : "Agotado"}
    </button>
  );
}
