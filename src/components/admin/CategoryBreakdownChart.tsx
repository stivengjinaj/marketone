import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type {CategoryBreakdown} from "../../types";
import { formatCurrency } from '../../utils/formatCurrency'

interface CategoryBreakdownChartProps {
  data: CategoryBreakdown[]
}

export default function CategoryBreakdownChart({ data }: CategoryBreakdownChartProps) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} layout="vertical" margin={{ top: 10, right: 20, bottom: 0, left: 0 }}>
        <CartesianGrid horizontal={false} stroke="#e2e8f0" />
        <XAxis type="number" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
        <YAxis
          type="category"
          dataKey="category"
          tick={{ fontSize: 12, fill: '#334155' }}
          axisLine={false}
          tickLine={false}
          width={90}
        />
        <Tooltip
          contentStyle={{ borderRadius: 8, borderColor: '#e2e8f0', fontSize: 12 }}
          formatter={(value) => [formatCurrency(Number(value)), 'Vlera e parashikuar']}
        />
        <Bar dataKey="value" fill="#334155" radius={[0, 4, 4, 0]} barSize={14} />
      </BarChart>
    </ResponsiveContainer>
  )
}
