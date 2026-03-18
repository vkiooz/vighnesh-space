import foodData from "@/content/food.json"

export type FoodItem = {
  name: string
  quantity: number
  price: number | null
  image?: string
}

export type FoodOrder = {
  order_id: string
  platform: string
  date: string
  restaurant: string
  items: FoodItem[]
  item_total: number | null
  discount: number | null
  taxes: number | null
  amount_paid_INR: number
  delivery_address: string
}

export const orders: FoodOrder[] = foodData as FoodOrder[]

export function getOrdersByMonth(): Record<string, FoodOrder[]> {
  const grouped: Record<string, FoodOrder[]> = {}
  for (const order of orders) {
    const month = order.date.slice(0, 7)
    if (!grouped[month]) grouped[month] = []
    grouped[month].push(order)
  }
  return grouped
}

export function getRestaurants(): string[] {
  return [...new Set(orders.map((o) => o.restaurant))].sort()
}

export function getPlatforms(): string[] {
  return [...new Set(orders.map((o) => o.platform))].sort()
}
