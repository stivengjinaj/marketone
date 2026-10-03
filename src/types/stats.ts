export interface SalesPoint {
  date: string
  revenue: number
  orders: number
}

export interface CategoryBreakdown {
  category: string
  value: number
}

export interface ExpiringProduct {
  productId: string
  name: string
  expiresAt: string
  stock: number
}

export interface LowStockProduct {
  productId: string
  name: string
  stock: number
  threshold: number
}

export interface DashboardStats {
  totalRevenue: number
  revenueChangePct: number
  totalOrders: number
  ordersChangePct: number
  activeOperators: number
  activeOperatorsChangePct: number
  averageOrderValue: number
  averageOrderValueChangePct: number
  salesTrend: SalesPoint[]
  categoryBreakdown: CategoryBreakdown[]
  expiringProducts: ExpiringProduct[]
  lowStockProducts: LowStockProduct[]
}
