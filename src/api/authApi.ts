import { MOCK_ACCOUNTS } from '../mocks/users'
import type { LoginCredentials, User } from '../types'

export const login = (credentials: LoginCredentials): Promise<User> => {
  // void ENDPOINTS.login

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const account = MOCK_ACCOUNTS.find(
        (entry) =>
          entry.user.email.toLowerCase() === credentials.email.toLowerCase() &&
          entry.password === credentials.password,
      )

      if (!account) {
        reject(new Error('Dicka shkoi keq. Kontrolloni kredencialet.'))
        return
      }

      resolve(account.user)
    }, 500)
  })
}
