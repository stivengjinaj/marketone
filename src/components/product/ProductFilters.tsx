import type { ProductCategory } from '../../types'
import {BiSearch} from "react-icons/bi";

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

interface ProductFiltersProps {
  search: string
  category: ProductCategory | 'Te gjitha'
  onSearchChange: (value: string) => void
  onCategoryChange: (value: ProductCategory | 'Te gjitha') => void
}

export default function ProductFilters({
  search,
  category,
  onSearchChange,
  onCategoryChange,
}: ProductFiltersProps) {
  return (
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
            {item === 'Te gjitha' ? 'Te gjitha' : item}
          </option>
        ))}
      </select>
    </div>
  )
}
