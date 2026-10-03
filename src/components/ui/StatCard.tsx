import Card from './Card'

interface StatCardProps {
  label: string
  value: string
  changePct: number
}

export default function StatCard({ label, value, changePct }: StatCardProps) {
  const isPositive = changePct >= 0

  return (
    <Card>
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-slate-900">{value}</p>
      <p
        className={[
          'mt-1 text-xs font-medium',
          isPositive ? 'text-emerald-600' : 'text-red-600',
        ].join(' ')}
      >
        {isPositive ? '+' : ''}
        {changePct.toFixed(1)}% vs para 1 muaji
      </p>
    </Card>
  )
}
