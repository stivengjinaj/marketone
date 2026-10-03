import ExpiringProductsCard from '../../components/admin/ExpiringProductsCard'
import LowStockCard from '../../components/admin/LowStockCard'
import AdminLayout from '../../components/layout/AdminLayout'
import ErrorState from '../../components/ui/ErrorState'
import LoadingState from '../../components/ui/LoadingState'
import { useDashboardStats } from '../../hooks/useDashboardStats'

export default function AdminAlertsPage() {
  const { stats, status, error, reload } = useDashboardStats()

  return (
    <AdminLayout title="Njoftime">
      {status === 'loading' && <LoadingState label="Duke ngarkuar..." />}
      {status === 'error' && <ErrorState message={error ?? 'Dicka shkoi keq'} onRetry={reload} />}

      {status === 'success' && stats && (
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <ExpiringProductsCard products={stats.expiringProducts} />
          <LowStockCard products={stats.lowStockProducts} />
        </div>
      )}
    </AdminLayout>
  )
}
