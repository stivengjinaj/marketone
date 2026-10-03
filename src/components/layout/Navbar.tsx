import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useCart } from '../../hooks/useCart'
import {BiMenu, BiX} from "react-icons/bi";

const NAV_LINKS = [
  { to: '/dashboard', label: 'Produktet', end: true },
  { to: '/dashboard/orders', label: 'Shporta' },
]

function NavItem({to, label, end, onClick}: {
  to: string
  label: string
  end?: boolean
  onClick?: () => void
}) {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) =>
        [
          'rounded-md px-3 py-2 text-sm font-medium transition-colors',
          isActive
            ? 'bg-slate-100 text-slate-900'
            : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900',
        ].join(' ')
      }
    >
      {label}
    </NavLink>
  )
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const { itemCount } = useCart()

  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <span className="text-base font-semibold text-slate-900">MarketOne</span>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <div key={link.to} className="relative">
              <NavItem {...link} />
              {link.to === '/dashboard/orders' && itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-slate-900 text-[10px] font-semibold text-white">
                  {itemCount}
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <span className="text-sm text-slate-600">{user?.name}</span>
          <button
            type="button"
            onClick={logout}
            className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            Dil
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((open) => !open)}
          className="inline-flex items-center justify-center rounded-md p-2 text-slate-600 hover:bg-slate-100 md:hidden"
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? (
            <BiX/>
          ) : (
            <BiMenu/>
          )}
        </button>
      </nav>

      {isMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-4 pb-4 pt-2 md:hidden">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <NavItem key={link.to} {...link} onClick={closeMenu} />
            ))}
          </div>
          <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-3">
            <span className="text-sm text-slate-600">{user?.name}</span>
            <button
              type="button"
              onClick={() => {
                closeMenu()
                logout()
              }}
              className="rounded-md border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              Dil
            </button>
          </div>
        </div>
      )}
    </header>
  )
}
