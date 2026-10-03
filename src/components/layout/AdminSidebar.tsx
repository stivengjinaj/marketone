import { NavLink } from 'react-router-dom'
import { ADMIN_NAV_ITEMS } from './adminNavItems'

export default function AdminSidebar() {
  return (
    <aside className="hidden w-60 shrink-0 border-r border-slate-200 bg-white md:block">
      <div className="flex h-16 items-center gap-2 border-b border-slate-200 px-6">
        <span className="text-base font-semibold text-slate-900">MarketOne</span>
      </div>
      <nav className="flex flex-col gap-1 p-4">
        {ADMIN_NAV_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
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
    </aside>
  )
}
