import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { SalesPoint } from '../../types'
import { formatCurrency } from '../../utils/formatCurrency'

interface SalesTrendChartProps {
  data: SalesPoint[]
}

export default function SalesTrendChart({ data }: SalesTrendChartProps) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0f172a" stopOpacity={0.15} />
            <stop offset="100%" stopColor="#0f172a" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="#e2e8f0" />
        <XAxis
          dataKey="date"
          tickFormatter={(value: string) => value.slice(5)}
          tick={{ fontSize: 12, fill: '#64748b' }}
          axisLine={{ stroke: '#e2e8f0' }}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 12, fill: '#64748b' }}
          axisLine={false}
          tickLine={false}
          width={48}
        />
        <Tooltip
          contentStyle={{ borderRadius: 8, borderColor: '#e2e8f0', fontSize: 12 }}
          formatter={(value) => [formatCurrency(Number(value)), 'Fitimi']}
        />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="#0f172a"
          strokeWidth={2}
          fill="url(#revenueFill)"
        />
      </AreaChart>
    </ResponsiveContainer>
  )
}
