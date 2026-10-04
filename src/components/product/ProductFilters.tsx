import type { ProductCategory } from '../../types'
import { BiSearch } from 'react-icons/bi'

const CATEGORIES: Array<ProductCategory | 'Te gjitha'> = [
  'Te gjitha',
  'Pije',
  'Te perditshme',
  'Furra',
  'Prodhime',
  'Snacks',
  'Shtepi',
  'Te ngrira',
  'Bulmet',
]

export type ProductAvailability = 'all' | 'in-stock' | 'out-of-stock'
export type ProductSortOption = 'default' | 'name-asc' | 'price-asc' | 'price-desc'

interface ProductFiltersProps {
  search: string
  category: ProductCategory | 'Te gjitha'
  availability: ProductAvailability
  sortBy: ProductSortOption
  onSearchChange: (value: string) => void
  onCategoryChange: (value: ProductCategory | 'Te gjitha') => void
  onAvailabilityChange: (value: ProductAvailability) => void
  onSortChange: (value: ProductSortOption) => void
}

export default function ProductFilters({
  search,
  category,
  availability,
  sortBy,
  onSearchChange,
  onCategoryChange,
  onAvailabilityChange,
  onSortChange,
}: ProductFiltersProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <BiSearch className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Kerko produkte..."
            className="w-full rounded-md border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-500"
          />
        </div>
        <select
          value={category}
          onChange={(event) => onCategoryChange(event.target.value as ProductCategory | 'Te gjitha')}
          className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-500"
        >
          {CATEGORIES.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <select
          aria-label="Filtro sipas gjendjes se stokut"
          value={availability}
          onChange={(event) => onAvailabilityChange(event.target.value as ProductAvailability)}
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-500 sm:w-auto"
        >
          <option value="all">Te gjitha gjendjet</option>
          <option value="in-stock">Ne stock</option>
          <option value="out-of-stock">Jashte stock-ut</option>
        </select>
        <select
          aria-label="Rendit produktet"
          value={sortBy}
          onChange={(event) => onSortChange(event.target.value as ProductSortOption)}
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-500 sm:w-auto"
        >
          <option value="default">Renditja fillestare</option>
          <option value="name-asc">Emri: A-Z</option>
          <option value="price-asc">Cmimi: nga me i uleti</option>
          <option value="price-desc">Cmimi: nga me i larti</option>
        </select>
      </div>
    </div>
  )
}
