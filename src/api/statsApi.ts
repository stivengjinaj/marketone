import { MOCK_DASHBOARD_STATS } from '../mocks/stats'
import type { DashboardStats } from '../types'
import { simulateRequest } from './simulateRequest'

export const fetchDashboardStats = (): Promise<DashboardStats> => {
  return simulateRequest(MOCK_DASHBOARD_STATS, { delayMs: 700 })
}
