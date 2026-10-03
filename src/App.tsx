import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { CartProvider } from './context/CartContext'
import AdminAlertsPage from './pages/admin/AdminAlertsPage'
import AdminOverviewPage from './pages/admin/AdminOverviewPage'
import DashboardPage from './pages/DashboardPage'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import NotFoundPage from './pages/NotFoundPage'
import OrdersPage from './pages/OrdersPage'
import ProtectedRoute from './routes/ProtectedRoute'

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />

            <Route element={<ProtectedRoute allowedRoles={['client']} />}>
              <Route path="/dashboard" element={<DashboardPage />} />
              <Route path="/dashboard/orders" element={<OrdersPage />} />
            </Route>

            <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
              <Route path="/admin" element={<AdminOverviewPage />} />
              <Route path="/admin/alerts" element={<AdminAlertsPage />} />
            </Route>

            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}
