import type { DashboardStats } from '../types'
import { MOCK_PRODUCTS } from './products'

const LOW_STOCK_THRESHOLD = 10

const buildSalesTrend = (): DashboardStats['salesTrend'] => {
  const base = [1240, 1380, 1190, 1510, 1670, 1420, 1830, 1760, 1950, 2110, 1990, 2240, 2380, 2290]
  const today = new Date()
  return base.map((revenue, index) => {
    const date = new Date(today)
    date.setDate(today.getDate() - (base.length - 1 - index))
    return {
      date: date.toISOString().slice(0, 10),
      revenue,
      orders: Math.round(revenue / 38),
    }
  })
}

const buildExpiringProducts = (): DashboardStats['expiringProducts'] =>
  MOCK_PRODUCTS.filter((product) => Boolean(product.expiresAt))
    .map((product) => ({
      productId: product.id,
      name: product.name,
      expiresAt: product.expiresAt as string,
      stock: product.stock,
    }))
    .sort((a, b) => new Date(a.expiresAt).getTime() - new Date(b.expiresAt).getTime())

const buildLowStockProducts = (): DashboardStats['lowStockProducts'] =>
  MOCK_PRODUCTS.filter((product) => product.stock > 0 && product.stock <= LOW_STOCK_THRESHOLD)
    .map((product) => ({
      productId: product.id,
      name: product.name,
      stock: product.stock,
      threshold: LOW_STOCK_THRESHOLD,
    }))
    .sort((a, b) => a.stock - b.stock)

const buildCategoryBreakdown = (): DashboardStats['categoryBreakdown'] => {
  const totals = new Map<string, number>()
  MOCK_PRODUCTS.forEach((product) => {
    const current = totals.get(product.category) ?? 0
    totals.set(product.category, current + product.price * Math.max(product.stock, 1))
  })
  return Array.from(totals.entries()).map(([category, value]) => ({
    category,
    value: Math.round(value),
  }))
}

export const MOCK_DASHBOARD_STATS: DashboardStats = {
  totalRevenue: 24380,
  revenueChangePct: 12.4,
  totalOrders: 642,
  ordersChangePct: 8.1,
  activeOperators: 37,
  activeOperatorsChangePct: 4.6,
  averageOrderValue: 120.0,
  averageOrderValueChangePct: -1.8,
  salesTrend: buildSalesTrend(),
  categoryBreakdown: buildCategoryBreakdown(),
  expiringProducts: buildExpiringProducts(),
  lowStockProducts: buildLowStockProducts(),
}
