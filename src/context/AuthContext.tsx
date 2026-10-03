import { useCallback, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { login as loginRequest } from '../api/authApi'
import type { LoginCredentials, User } from '../types'
import { AuthContext } from './auth_context.ts'

const STORAGE_KEY = 'marketone.session'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (!stored) return null

    try {
      return JSON.parse(stored) as User
    } catch {
      window.localStorage.removeItem(STORAGE_KEY)
      return null
    }
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const login = useCallback(async (credentials: LoginCredentials) => {
    setIsLoading(true)
    setError(null)
    try {
      const loggedInUser = await loginRequest(credentials)
      setUser(loggedInUser)
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(loggedInUser))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to sign in')
      throw err
    } finally {
      setIsLoading(false)
    }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    window.localStorage.removeItem(STORAGE_KEY)
  }, [])

  const value = useMemo(
    () => ({ user, isLoading, error, login, logout }),
    [user, isLoading, error, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
