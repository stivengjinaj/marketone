import type { OrderItem } from '../../types'
import { formatCurrency } from '../../utils/formatCurrency'

interface CartItemRowProps {
  item: OrderItem
  onQuantityChange: (productId: string, quantity: number) => void
  onRemove: (productId: string) => void
}

export default function CartItemRow({ item, onQuantityChange, onRemove }: CartItemRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 border-slate-100 py-3 last:border-b-0">
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-slate-900">{item.product.name}</p>
        <p className="text-xs text-slate-500">{formatCurrency(item.product.price)} / {item.product.unit}</p>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center rounded-md border border-slate-300">
          <button
            type="button"
            onClick={() => onQuantityChange(item.product.id, item.quantity - 1)}
            className="px-2 py-1 text-slate-600 hover:bg-slate-50"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="w-8 text-center text-sm text-slate-900">{item.quantity}</span>
          <button
            type="button"
            onClick={() => onQuantityChange(item.product.id, item.quantity + 1)}
            className="px-2 py-1 text-slate-600 hover:bg-slate-50"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        <span className="w-16 text-right text-sm font-medium text-slate-900">
          {formatCurrency(item.product.price * item.quantity)}
        </span>
        <button
          type="button"
          onClick={() => onRemove(item.product.id)}
          className="text-slate-400 hover:text-red-600"
          aria-label="Remove item"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  )
}
