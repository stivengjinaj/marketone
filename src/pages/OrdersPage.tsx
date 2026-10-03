import { useState } from 'react'
import DashboardLayout from '../components/layout/DashboardLayout'
import OrderSummary from '../components/order/OrderSummary'
import { submitOrder } from '../api'
import { useCart } from '../hooks/useCart'

export default function OrdersPage() {
  const { items, total, updateQuantity, removeProduct, clear } = useCart()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [confirmedOrderId, setConfirmedOrderId] = useState<string | null>(null)

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const order = await submitOrder(items)
      setConfirmedOrderId(order.id)
      clear()
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-1">
        <h1 className="text-xl font-semibold text-slate-900">Porosia juaj</h1>
        <p className="text-sm text-slate-500">Kontrolloni sasite para se te kryeni pagesen.</p>
      </div>

      {confirmedOrderId && (
        <div className="mt-6 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          Porosia {confirmedOrderId} u krye me sukses.
        </div>
      )}

      <div className="mt-6 max-w-xl">
        <OrderSummary
          items={items}
          total={total}
          isSubmitting={isSubmitting}
          onQuantityChange={updateQuantity}
          onRemove={removeProduct}
          onSubmit={handleSubmit}
        />
      </div>
    </DashboardLayout>
  )
}
