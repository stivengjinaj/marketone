const allFormatter = new Intl.NumberFormat('sq-AL', {
  style: 'currency',
  currency: 'ALL',
  currencyDisplay: 'code',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export const formatCurrency = (amount: number): string => allFormatter.format(amount)
