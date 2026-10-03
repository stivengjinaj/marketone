import { useState } from 'react'
import type { SubmitEvent } from 'react'
import { Navigate } from 'react-router-dom'
import Button from '../components/ui/Button'
import { useAuth } from '../hooks/useAuth'


export default function LoginPage() {
  const { user, login, isLoading, error } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  if (user) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} replace />
  }

  const handleSubmit = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    try {
      await login({ email, password })
    } catch {
      setPassword('')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
        <h1 className="text-lg font-semibold text-slate-900">Akseso MarketOne</h1>

        <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="text-sm font-medium text-slate-700">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-slate-700">
              Fjalekalimi
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-500"
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? 'Duke aksesuar...' : 'Akseso'}
          </Button>
        </form>
      </div>
    </div>
  )
}
