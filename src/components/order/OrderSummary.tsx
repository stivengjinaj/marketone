import Button from '../ui/Button'
import Card from '../ui/Card'
import EmptyState from '../ui/EmptyState'
import type { OrderItem } from '../../types'
import CartItemRow from './CartItemRow'
import { formatCurrency } from '../../utils/formatCurrency'

interface OrderSummaryProps {
  items: OrderItem[]
  total: number
  isSubmitting: boolean
  onQuantityChange: (productId: string, quantity: number) => void
  onRemove: (productId: string) => void
  onSubmit: () => void
}

export default function OrderSummary({
  items,
  total,
  isSubmitting,
  onQuantityChange,
  onRemove,
  onSubmit,
}: OrderSummaryProps) {
  if (items.length === 0) {
    return (
      <EmptyState
        title="Shporta juaj eshte bosh"
        description="Shto produkte nga katalogu per te krijuar nje porosi."
      />
    )
  }

  return (
    <Card>
      <h2 className="text-sm font-semibold text-slate-900">Order summary</h2>
      <div className="mt-2">
        {items.map((item) => (
          <CartItemRow
            key={item.product.id}
            item={item}
            onQuantityChange={onQuantityChange}
            onRemove={onRemove}
          />
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-slate-200 pt-4">
        <span className="text-sm font-medium text-slate-600">Totali</span>
        <span className="text-lg font-semibold text-slate-900">{formatCurrency(total)}</span>
      </div>
      <Button className="mt-4 w-full" onClick={onSubmit} disabled={isSubmitting}>
        {isSubmitting ? 'Duke porositur...' : 'Porosit'}
      </Button>
    </Card>
  )
}
