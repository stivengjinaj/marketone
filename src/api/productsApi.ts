import { MOCK_PRODUCTS } from '../mocks/products'
import type { Product } from '../types'
import { simulateRequest } from './simulateRequest'

export const fetchProducts = (): Promise<Product[]> => {
  return simulateRequest(MOCK_PRODUCTS, { delayMs: 700 })
}
