import type { Product } from './product'

export interface OrderItem {
  product: Product
  quantity: number
}

export type OrderStatus = 'pending' | 'confirmed' | 'cancelled'

export interface Order {
  id: string
  items: OrderItem[]
  total: number
  status: OrderStatus
  createdAt: string
}
