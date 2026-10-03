import type { Order, OrderItem } from '../types'
import { simulateRequest } from './simulateRequest'

export const submitOrder = (items: OrderItem[]): Promise<Order> => {

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  const order: Order = {
    id: `order-${Date.now()}`,
    items,
    total,
    status: 'confirmed',
    createdAt: new Date().toISOString(),
  }

  return simulateRequest(order, { delayMs: 800 })
}
