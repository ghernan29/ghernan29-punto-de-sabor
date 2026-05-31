"use client"

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react"

import { getPublicAppConfig } from "@/lib/config"
import type { CartItem, CheckoutFormValues, OrderType } from "@/types/app"
import type { MenuItemRow } from "@/types/database"

type CartContextValue = {
  items: CartItem[]
  hasHydrated: boolean
  itemCount: number
  subtotal: number
  deliveryFee: number
  minOrderAmount: number
  orderType: OrderType
  total: number
  addItem: (item: MenuItemRow) => void
  decrementItem: (itemId: string) => void
  incrementItem: (itemId: string) => void
  removeItem: (itemId: string) => void
  clearCart: () => void
  setOrderType: (orderType: OrderType) => void
  getDefaultCheckoutValues: () => CheckoutFormValues
}

const cartStorageKey = "punto-de-sabor-cart"
const orderTypeStorageKey = "punto-de-sabor-order-type"

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [orderType, setOrderType] = useState<OrderType>("delivery")
  const [hasHydrated, setHasHydrated] = useState(false)
  const { deliveryFee, minOrderAmount } = getPublicAppConfig()

  useEffect(() => {
    try {
      const savedItems = window.localStorage.getItem(cartStorageKey)
      const savedOrderType = window.localStorage.getItem(
        orderTypeStorageKey,
      ) as OrderType | null

      if (savedItems) {
        setItems(JSON.parse(savedItems))
      }

      if (savedOrderType === "delivery" || savedOrderType === "pickup") {
        setOrderType(savedOrderType)
      }
    } catch {
      // Ignore malformed localStorage and start with a clean cart.
    } finally {
      setHasHydrated(true)
    }
  }, [])

  useEffect(() => {
    if (!hasHydrated) {
      return
    }

    window.localStorage.setItem(cartStorageKey, JSON.stringify(items))
  }, [items, hasHydrated])

  useEffect(() => {
    if (!hasHydrated) {
      return
    }

    window.localStorage.setItem(orderTypeStorageKey, orderType)
  }, [hasHydrated, orderType])

  const addItem = useCallback((item: MenuItemRow) => {
    if (!item.is_available) {
      return
    }

    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (currentItem) => currentItem.id === item.id,
      )

      if (existingItem) {
        return currentItems.map((currentItem) =>
          currentItem.id === item.id
            ? { ...currentItem, quantity: currentItem.quantity + 1 }
            : currentItem,
        )
      }

      return [...currentItems, { ...item, quantity: 1 }]
    })
  }, [])

  const incrementItem = useCallback((itemId: string) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    )
  }, [])

  const decrementItem = useCallback((itemId: string) => {
    setItems((currentItems) =>
      currentItems
        .map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item,
        )
        .filter((item) => item.quantity > 0),
    )
  }, [])

  const removeItem = useCallback((itemId: string) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.id !== itemId),
    )
  }, [])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  )
  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  )
  const appliedDeliveryFee =
    orderType === "delivery" && items.length > 0 ? deliveryFee : 0
  const total = subtotal + appliedDeliveryFee

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      hasHydrated,
      itemCount,
      subtotal,
      deliveryFee,
      minOrderAmount,
      orderType,
      total,
      addItem,
      decrementItem,
      incrementItem,
      removeItem,
      clearCart,
      setOrderType,
      getDefaultCheckoutValues: () => ({
        name: "",
        phone: "",
        address: "",
        notes: "",
        orderType,
      }),
    }),
    [
      addItem,
      clearCart,
      decrementItem,
      deliveryFee,
      hasHydrated,
      incrementItem,
      itemCount,
      items,
      minOrderAmount,
      orderType,
      removeItem,
      subtotal,
      total,
    ],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const value = useContext(CartContext)

  if (!value) {
    throw new Error("useCart must be used inside CartProvider")
  }

  return value
}
