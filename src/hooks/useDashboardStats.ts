import { useCallback, useEffect, useState } from 'react'
import { fetchDashboardStats } from '../api'
import type { DashboardStats } from '../types'
import type { RequestStatus } from './useProducts'

export const useDashboardStats = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [status, setStatus] = useState<RequestStatus>('loading')
  const [error, setError] = useState<string | null>(null)

  const load = useCallback(async () => {
    const data = await fetchDashboardStats()
    setStats(data)
    setStatus('success')
  }, [])

  useEffect(() => {
    let active = true

    fetchDashboardStats()
      .then((data) => {
        if (active) {
          setStats(data)
          setStatus('success')
        }
      })
      .catch((err: unknown) => {
        if (active) {
          setError(err instanceof Error ? err.message : 'Failed to load statistics')
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
      setError(err instanceof Error ? err.message : 'Failed to load statistics')
      setStatus('error')
    })
  }, [load])

  return { stats, status, error, reload }
}
