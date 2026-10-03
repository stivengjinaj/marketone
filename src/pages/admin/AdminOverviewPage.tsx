import { Link } from 'react-router-dom'
import CategoryBreakdownChart from '../../components/admin/CategoryBreakdownChart'
import ExpiringProductsCard from '../../components/admin/ExpiringProductsCard'
import LowStockCard from '../../components/admin/LowStockCard'
import SalesTrendChart from '../../components/admin/SalesTrendChart'
import AdminLayout from '../../components/layout/AdminLayout'
import Card from '../../components/ui/Card'
import ErrorState from '../../components/ui/ErrorState'
import LoadingState from '../../components/ui/LoadingState'
import StatCard from '../../components/ui/StatCard'
import { useDashboardStats } from '../../hooks/useDashboardStats'
import { formatCurrency } from '../../utils/formatCurrency'

export default function AdminOverviewPage() {
  const { stats, status, error, reload } = useDashboardStats()

  return (
    <AdminLayout title="Permbledhje">
      {status === 'loading' && <LoadingState label="Duke ngarkuar..." />}
      {status === 'error' && <ErrorState message={error ?? 'Dicka shkoi keq'} onRetry={reload} />}

      {status === 'success' && stats && (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              label="Fitimi total"
              value={formatCurrency(stats.totalRevenue)}
              changePct={stats.revenueChangePct}
            />
            <StatCard
              label="Porosi"
              value={stats.totalOrders.toLocaleString()}
              changePct={stats.ordersChangePct}
            />
            <StatCard
              label="Operator aktiv"
              value={stats.activeOperators.toLocaleString()}
              changePct={stats.activeOperatorsChangePct}
            />
            <StatCard
              label="Vlera mesatare e porosise"
              value={formatCurrency(stats.averageOrderValue)}
              changePct={stats.averageOrderValueChangePct}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <h2 className="text-sm font-semibold text-slate-900">Fitimi ne 14 ditet e fundit</h2>
              <div className="mt-2">
                <SalesTrendChart data={stats.salesTrend} />
              </div>
            </Card>
            <Card>
              <h2 className="text-sm font-semibold text-slate-900">Stock-u sipas kategorise</h2>
              <div className="mt-2">
                <CategoryBreakdownChart data={stats.categoryBreakdown} />
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <ExpiringProductsCard products={stats.expiringProducts} limit={4} />
            <LowStockCard products={stats.lowStockProducts} limit={4} />
          </div>

          <div className="text-right">
            <Link to="/admin/alerts" className="text-sm font-medium text-slate-600 hover:text-slate-900">
              Shko tek njoftimet →
            </Link>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
