import type { User } from '../types'

export interface MockAccount {
  user: User
  password: string
}

export const MOCK_ACCOUNTS: MockAccount[] = [
  {
    user: {
      id: 'u1',
      name: 'Stiven Gjinaj',
      email: 'client@infinitron.al',
      role: 'client',
    },
    password: 'client123',
  },
  {
    user: {
      id: 'a1',
      name: 'Steven Gjinaj',
      email: 'admin@infinitron.al',
      role: 'admin',
    },
    password: 'admin123',
  },
]
