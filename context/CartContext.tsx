"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { CartLine, MenuItem } from "@/lib/types";
import { config } from "@/lib/config";

const STORAGE_KEY = "punto-de-sabor-cart";

type CartContextValue = {
  lines: CartLine[];
  itemCount: number;
  subtotal: number;
  deliveryFee: number;
  total: number;
  meetsMinimum: boolean;
  minimumOrder: number;
  addItem: (item: MenuItem) => void;
  removeItem: (menuItemId: string) => void;
  setQuantity: (menuItemId: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function loadStored(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as CartLine[];
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setLines(loadStored());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines, hydrated]);

  const addItem = useCallback((item: MenuItem) => {
    if (!item.is_available) return;
    setLines((prev) => {
      const existing = prev.find((l) => l.menuItemId === item.id);
      if (existing) {
        return prev.map((l) =>
          l.menuItemId === item.id
            ? { ...l, quantity: l.quantity + 1 }
            : l
        );
      }
      return [
        ...prev,
        {
          menuItemId: item.id,
          name: item.name,
          price: item.price,
          quantity: 1,
          imageUrl: item.image_url,
        },
      ];
    });
  }, []);

  const removeItem = useCallback((menuItemId: string) => {
    setLines((prev) => prev.filter((l) => l.menuItemId !== menuItemId));
  }, []);

  const setQuantity = useCallback((menuItemId: string, quantity: number) => {
    if (quantity <= 0) {
      setLines((prev) => prev.filter((l) => l.menuItemId !== menuItemId));
      return;
    }
    setLines((prev) =>
      prev.map((l) =>
        l.menuItemId === menuItemId ? { ...l, quantity } : l
      )
    );
  }, []);

  const clearCart = useCallback(() => setLines([]), []);

  const subtotal = useMemo(
    () => lines.reduce((sum, l) => sum + l.price * l.quantity, 0),
    [lines]
  );

  const itemCount = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity, 0),
    [lines]
  );

  const value = useMemo<CartContextValue>(() => {
    const minimumOrder = config.minimumOrder;
    const meetsMinimum = subtotal >= minimumOrder;
    return {
      lines,
      itemCount,
      subtotal,
      deliveryFee: config.deliveryFee,
      total: subtotal,
      meetsMinimum,
      minimumOrder,
      addItem,
      removeItem,
      setQuantity,
      clearCart,
    };
  }, [lines, itemCount, subtotal, addItem, removeItem, setQuantity, clearCart]);

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart debe usarse dentro de CartProvider");
  }
  return ctx;
}

/** Totals with optional delivery fee applied */
export function useCartTotals(fulfillment: "delivery" | "pickup") {
  const { subtotal, deliveryFee, minimumOrder } = useCart();
  const fee = fulfillment === "delivery" ? deliveryFee : 0;
  const total = subtotal + fee;
  const meetsMinimum = subtotal >= minimumOrder;
  return { subtotal, deliveryFee: fee, total, meetsMinimum, minimumOrder };
}
