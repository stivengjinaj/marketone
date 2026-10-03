import { useMemo, useState } from 'react'
import DashboardLayout from '../components/layout/DashboardLayout'
import ProductFilters from '../components/product/ProductFilters'
import ProductGrid from '../components/product/ProductGrid'
import EmptyState from '../components/ui/EmptyState'
import ErrorState from '../components/ui/ErrorState'
import LoadingState from '../components/ui/LoadingState'
import { useCart } from '../hooks/useCart'
import { useProducts } from '../hooks/useProducts'
import type { ProductCategory } from '../types'

export default function DashboardPage() {
  const { products, status, error, reload } = useProducts()
  const { addProduct } = useCart()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<ProductCategory | 'Te gjitha'>('Te gjitha')

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = category === 'Te gjitha' || product.category === category
      return matchesSearch && matchesCategory
    })
  }, [products, search, category])

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold text-slate-900">Produktet</h1>
        <p className="text-sm text-slate-500">Shfleto katalogun e produkteve dhe shto produkte ne shporte.</p>
      </div>

      <div className="mt-6">
        <ProductFilters
          search={search}
          category={category}
          onSearchChange={setSearch}
          onCategoryChange={setCategory}
        />
      </div>

      <div className="mt-6">
        {status === 'loading' && <LoadingState label="Duke ngarkuar produktet..." />}
        {status === 'error' && <ErrorState message={error ?? 'Dicka shkoi keq'} onRetry={reload} />}
        {status === 'success' && filteredProducts.length === 0 && (
          <EmptyState
            title="Nuk u gjeten produkte"
            description="Provo nje emer apo kategori tjeter."
          />
        )}
        {status === 'success' && filteredProducts.length > 0 && (
          <ProductGrid products={filteredProducts} onAdd={addProduct} />
        )}
      </div>
    </DashboardLayout>
  )
}
