import { makeDbLoadAccountByToken } from '../use-cases/account/load-account-by-token/db-load-account-by-token-factory'
import { AuthMiddleware } from './../../../presentation/middleware/auth-middleware'
import { Middleware } from './../../../presentation/protocols/middleware'

export const makeAuthMiddleware = (role?: string): Middleware => {
  return new AuthMiddleware(makeDbLoadAccountByToken(), role)
}
