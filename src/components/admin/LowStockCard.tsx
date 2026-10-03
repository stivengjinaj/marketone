import Badge from '../ui/Badge'
import Card from '../ui/Card'
import EmptyState from '../ui/EmptyState'
import type { LowStockProduct } from '../../types'

interface LowStockCardProps {
  products: LowStockProduct[]
  limit?: number
}

export default function LowStockCard({ products, limit }: LowStockCardProps) {
  const visible = limit ? products.slice(0, limit) : products

  return (
    <Card>
      <h2 className="text-sm font-semibold text-slate-900">Stock i ulet</h2>
      {visible.length === 0 ? (
        <div className="mt-3">
          <EmptyState title="Nivelet e stock-ut jane ok" description="Ska produkte nen rrezik stock-u." />
        </div>
      ) : (
        <ul className="mt-3 flex flex-col gap-2">
          {visible.map((product) => (
            <li
              key={product.productId}
              className="flex items-center justify-between rounded-md border border-slate-100 px-3 py-2"
            >
              <div>
                <p className="text-sm font-medium text-slate-900">{product.name}</p>
                <p className="text-xs text-slate-500">Limiti: {product.threshold} njesi</p>
              </div>
              <Badge variant={product.stock <= 5 ? 'danger' : 'warning'}>
                {product.stock} te mbetura
              </Badge>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}
