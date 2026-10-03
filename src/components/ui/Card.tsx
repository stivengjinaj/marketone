import type { HTMLAttributes, ReactNode } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
}

export default function Card({ className = '', children, ...rest }: CardProps) {
  return (
    <div
      className={[
        'rounded-xl border border-slate-200 bg-white p-5 shadow-sm',
        className,
      ].join(' ')}
      {...rest}
    >
      {children}
    </div>
  )
}
