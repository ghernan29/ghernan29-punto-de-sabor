"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { MenuItem } from "./types";

export interface CartLine {
  id: string;
  name: string;
  price: number;
  image_url: string | null;
  quantity: number;
}

interface CartState {
  lines: CartLine[];
  addItem: (item: MenuItem) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  removeItem: (id: string) => void;
  clear: () => void;
  totalQuantity: () => number;
  subtotal: () => number;
}

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      addItem: (item) =>
        set((state) => {
          const existing = state.lines.find((l) => l.id === item.id);
          if (existing) {
            return {
              lines: state.lines.map((l) =>
                l.id === item.id ? { ...l, quantity: l.quantity + 1 } : l
              ),
            };
          }
          return {
            lines: [
              ...state.lines,
              {
                id: item.id,
                name: item.name,
                price: item.price,
                image_url: item.image_url,
                quantity: 1,
              },
            ],
          };
        }),
      increment: (id) =>
        set((state) => ({
          lines: state.lines.map((l) =>
            l.id === id ? { ...l, quantity: l.quantity + 1 } : l
          ),
        })),
      decrement: (id) =>
        set((state) => ({
          lines: state.lines
            .map((l) =>
              l.id === id ? { ...l, quantity: l.quantity - 1 } : l
            )
            .filter((l) => l.quantity > 0),
        })),
      removeItem: (id) =>
        set((state) => ({ lines: state.lines.filter((l) => l.id !== id) })),
      clear: () => set({ lines: [] }),
      totalQuantity: () => get().lines.reduce((sum, l) => sum + l.quantity, 0),
      subtotal: () =>
        get().lines.reduce((sum, l) => sum + l.price * l.quantity, 0),
    }),
    {
      name: "punto-de-sabor-cart",
    }
  )
);
