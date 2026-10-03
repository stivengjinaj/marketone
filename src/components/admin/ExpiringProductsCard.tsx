import Badge from '../ui/Badge'
import Card from '../ui/Card'
import EmptyState from '../ui/EmptyState'
import type { ExpiringProduct } from '../../types'

interface ExpiringProductsCardProps {
  products: ExpiringProduct[]
  limit?: number
}

const daysUntil = (isoDate: string): number => {
  const diff = new Date(isoDate).getTime() - Date.now()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

export default function ExpiringProductsCard({ products, limit }: ExpiringProductsCardProps) {
  const visible = limit ? products.slice(0, limit) : products

  return (
    <Card>
      <h2 className="text-sm font-semibold text-slate-900">Skdaojne se shpejti</h2>
      {visible.length === 0 ? (
        <div className="mt-3">
          <EmptyState title="Nuk ka produkte qe skadojne" description="Nuk ka produkte qe jane afer skadences." />
        </div>
      ) : (
        <ul className="mt-3 flex flex-col gap-2">
          {visible.map((product) => {
            const days = daysUntil(product.expiresAt)
            const variant = days <= 2 ? 'danger' : days <= 5 ? 'warning' : 'neutral'
            return (
              <li
                key={product.productId}
                className="flex items-center justify-between rounded-md border border-slate-100 px-3 py-2"
              >
                <div>
                  <p className="text-sm font-medium text-slate-900">{product.name}</p>
                  <p className="text-xs text-slate-500">{product.stock} njesi ne stock</p>
                </div>
                <Badge variant={variant}>
                  {days <= 0 ? 'Skaduar' : `${days}d te mbetura`}
                </Badge>
              </li>
            )
          })}
        </ul>
      )}
    </Card>
  )
}
