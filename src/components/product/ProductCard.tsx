import Badge from '../ui/Badge'
import Button from '../ui/Button'
import type { Product } from '../../types'
import { formatCurrency } from '../../utils/formatCurrency'

interface ProductCardProps {
  product: Product
  onAdd: (product: Product) => void
}

export default function ProductCard({ product, onAdd }: ProductCardProps) {
  const isOutOfStock = product.stock === 0
  const isLowStock = product.stock > 0 && product.stock <= 10

  return (
    <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
      <div>
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-sm font-semibold text-slate-900">{product.name}</h3>
          <Badge variant="neutral">{product.category}</Badge>
        </div>
        <p className="mt-1 text-xs text-slate-500">{product.supplier}</p>
        <div className="mt-3 flex items-center justify-between">
          <span className="text-lg font-semibold text-slate-900">
            {formatCurrency(product.price)}
          </span>
          {isOutOfStock ? (
            <Badge variant="danger">0 ne stock</Badge>
          ) : isLowStock ? (
            <Badge variant="warning">{product.stock} te mbetura</Badge>
          ) : (
            <Badge variant="success">{product.stock} ne stock</Badge>
          )}
        </div>
      </div>
      <Button
        className="mt-4 w-full"
        disabled={isOutOfStock}
        onClick={() => onAdd(product)}
      >
        {isOutOfStock ? 'Nuk ka stock' : 'Shto te shporta'}
      </Button>
    </div>
  )
}
