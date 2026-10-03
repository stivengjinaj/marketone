import { useCallback, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { OrderItem, Product } from '../types'
import { CartContext } from './cart_context.ts'

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<OrderItem[]>([])

  const addProduct = useCallback((product: Product) => {
    setItems((current) => {
      const existing = current.find((item) => item.product.id === product.id)
      if (existing) {
        return current.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }
      return [...current, { product, quantity: 1 }]
    })
  }, [])

  const removeProduct = useCallback((productId: string) => {
    setItems((current) => current.filter((item) => item.product.id !== productId))
  }, [])

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setItems((current) => {
      if (quantity <= 0) {
        return current.filter((item) => item.product.id !== productId)
      }
      return current.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item,
      )
    })
  }, [])

  const clear = useCallback(() => setItems([]), [])

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
    [items],
  )

  const itemCount = useMemo(() => items.reduce((sum, item) => sum + item.quantity, 0), [items])

  const value = useMemo(
    () => ({ items, addProduct, removeProduct, updateQuantity, clear, total, itemCount }),
    [items, addProduct, removeProduct, updateQuantity, clear, total, itemCount],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
