import type { MenuItemRow } from "@/types/database"

export type CartItem = Pick<
  MenuItemRow,
  "id" | "category" | "name" | "description" | "price" | "image_url" | "is_available"
> & {
  quantity: number
}

export type OrderType = "delivery" | "pickup"

export type CheckoutFormValues = {
  name: string
  phone: string
  address: string
  notes: string
  orderType: OrderType
}
