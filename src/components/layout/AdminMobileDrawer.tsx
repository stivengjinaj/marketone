import { NavLink } from 'react-router-dom'
import { ADMIN_NAV_ITEMS } from './adminNavItems'

interface AdminMobileDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function AdminMobileDrawer({ isOpen, onClose }: AdminMobileDrawerProps) {
  if (!isOpen) {
    return null
  }

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="absolute inset-0 bg-slate-900/40" onClick={onClose} />
      <div className="absolute inset-y-0 left-0 w-64 bg-white p-4 shadow-xl">
        <div className="mb-4 flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-sm font-bold text-white">
            M1
          </span>
          <span className="text-base font-semibold text-slate-900">MarketOne</span>
        </div>
        <nav className="flex flex-col gap-1">
          {ADMIN_NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onClose}
              className={({ isActive }) =>
                [
                  'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-slate-100 text-slate-900'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
                ].join(' ')
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  )
}
