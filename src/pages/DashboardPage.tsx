import { useMemo, useState } from 'react'
import DashboardLayout from '../components/layout/DashboardLayout'
import ProductFilters from '../components/product/ProductFilters'
import ProductGrid from '../components/product/ProductGrid'
import EmptyState from '../components/ui/EmptyState'
import ErrorState from '../components/ui/ErrorState'
import LoadingState from '../components/ui/LoadingState'
import type { ProductAvailability, ProductSortOption } from '../components/product/ProductFilters'
import { useCart } from '../hooks/useCart'
import { useProducts } from '../hooks/useProducts'
import type { ProductCategory } from '../types'

export default function DashboardPage() {
  const { products, status, error, reload } = useProducts()
  const { addProduct } = useCart()
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<ProductCategory | 'Te gjitha'>('Te gjitha')
  const [availability, setAvailability] = useState<ProductAvailability>('all')
  const [sortBy, setSortBy] = useState<ProductSortOption>('default')

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = category === 'Te gjitha' || product.category === category
      const matchesAvailability =
        availability === 'all' ||
        (availability === 'in-stock' ? product.stock > 0 : product.stock === 0)
      return matchesSearch && matchesCategory && matchesAvailability
    })

    switch (sortBy) {
      case 'name-asc':
        return filtered.sort((a, b) => a.name.localeCompare(b.name, 'sq'))
      case 'price-asc':
        return filtered.sort((a, b) => a.price - b.price)
      case 'price-desc':
        return filtered.sort((a, b) => b.price - a.price)
      default:
        return filtered
    }
  }, [products, search, category, availability, sortBy])

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
          availability={availability}
          sortBy={sortBy}
          onSearchChange={setSearch}
          onCategoryChange={setCategory}
          onAvailabilityChange={setAvailability}
          onSortChange={setSortBy}
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
