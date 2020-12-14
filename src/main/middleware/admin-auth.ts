import { makeAuthMiddleware } from './../factories/middleware/auth-middleware-factory'
import { adaptMiddleware } from './../adapters/express/express-middleware-adapter'

export const adminAuth = adaptMiddleware(makeAuthMiddleware('admin'))
