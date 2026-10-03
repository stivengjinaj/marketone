import { createContext } from 'react'
import type { LoginCredentials, User } from '../types'

interface AuthContextValue {
  user: User | null
  isLoading: boolean
  error: string | null
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined)
