import { useState } from 'react'
import type { ReactNode } from 'react'
import AdminMobileDrawer from './AdminMobileDrawer'
import AdminSidebar from './AdminSidebar'
import AdminTopBar from './AdminTopBar'

interface AdminLayoutProps {
  title: string
  children: ReactNode
}

export default function AdminLayout({ title, children }: AdminLayoutProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <div className="flex min-h-screen bg-slate-50">
      <AdminSidebar />
      <AdminMobileDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
      <div className="flex min-w-0 flex-1 flex-col">
        <AdminTopBar title={title} onMenuClick={() => setIsDrawerOpen(true)} />
        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8">{children}</main>
      </div>
    </div>
  )
}
