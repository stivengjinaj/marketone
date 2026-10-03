import { useCallback, useEffect, useState } from 'react'
import { fetchProducts } from '../api'
import type { Product } from '../types'

export type RequestStatus = 'idle' | 'loading' | 'success' | 'error'

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [status, setStatus] = useState<RequestStatus>('loading')
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    const data = await fetchProducts()
    setProducts(data)
    setStatus('success')
  }, [])

  useEffect(() => {
    let active = true

    fetchProducts()
      .then((data) => {
        if (active) {
          setProducts(data)
          setStatus('success')
        }
      })
      .catch((err: unknown) => {
        if (active) {
          setError(err instanceof Error ? err.message : 'Failed to load products')
          setStatus('error')
        }
      })

    return () => {
      active = false
    }
  }, [])

  const reload = useCallback(() => {
    setStatus('loading')
    setError(null)
    load().catch((err: unknown) => {
      setError(err instanceof Error ? err.message : 'Failed to load products')
      setStatus('error')
    })
  }, [load])

  return { products, status, error, reload }
}
