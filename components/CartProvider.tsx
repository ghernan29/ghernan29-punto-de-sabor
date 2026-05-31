'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import type { MenuItem, OrderItem } from '@/lib/types';

interface CartLine {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image_url: string | null;
}

interface CartContextValue {
  lines: CartLine[];
  totalQuantity: number;
  subtotal: number;
  add: (item: MenuItem, quantity?: number) => void;
  setQuantity: (id: string, quantity: number) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  toOrderItems: () => OrderItem[];
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = 'pds.cart.v1';

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = typeof window !== 'undefined' ? window.localStorage.getItem(STORAGE_KEY) : null;
      if (raw) {
        const parsed = JSON.parse(raw) as CartLine[];
        if (Array.isArray(parsed)) setLines(parsed);
      }
    } catch {
      // ignoramos errores de parseo / storage no disponible
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // storage no disponible (modo privado, etc.)
    }
  }, [lines, hydrated]);

  const add = useCallback((item: MenuItem, quantity: number = 1) => {
    if (!item.is_available || quantity <= 0) return;
    setLines((prev) => {
      const existing = prev.find((l) => l.id === item.id);
      if (existing) {
        return prev.map((l) =>
          l.id === item.id ? { ...l, quantity: l.quantity + quantity } : l
        );
      }
      return [
        ...prev,
        {
          id: item.id,
          name: item.name,
          price: Number(item.price),
          quantity,
          image_url: item.image_url,
        },
      ];
    });
  }, []);

  const setQuantity = useCallback((id: string, quantity: number) => {
    setLines((prev) => {
      if (quantity <= 0) return prev.filter((l) => l.id !== id);
      return prev.map((l) => (l.id === id ? { ...l, quantity } : l));
    });
  }, []);

  const increment = useCallback(
    (id: string) =>
      setLines((prev) => prev.map((l) => (l.id === id ? { ...l, quantity: l.quantity + 1 } : l))),
    []
  );

  const decrement = useCallback((id: string) => {
    setLines((prev) =>
      prev
        .map((l) => (l.id === id ? { ...l, quantity: l.quantity - 1 } : l))
        .filter((l) => l.quantity > 0)
    );
  }, []);

  const remove = useCallback(
    (id: string) => setLines((prev) => prev.filter((l) => l.id !== id)),
    []
  );

  const clear = useCallback(() => setLines([]), []);

  const totalQuantity = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity, 0),
    [lines]
  );

  const subtotal = useMemo(
    () => lines.reduce((sum, l) => sum + l.price * l.quantity, 0),
    [lines]
  );

  const toOrderItems = useCallback(
    (): OrderItem[] =>
      lines.map((l) => ({
        id: l.id,
        name: l.name,
        price: l.price,
        quantity: l.quantity,
        subtotal: Number((l.price * l.quantity).toFixed(2)),
      })),
    [lines]
  );

  const value: CartContextValue = {
    lines,
    totalQuantity,
    subtotal,
    add,
    setQuantity,
    increment,
    decrement,
    remove,
    clear,
    toOrderItems,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error('useCart must be used inside <CartProvider>');
  }
  return ctx;
}
