import { Request, Response, NextFunction } from 'express'
import { HttpRequest } from './../../../presentation/protocols/http'
import { Middleware } from './../../../presentation/protocols/middleware'

export const adaptMiddleware = (middleware: Middleware) => {
  return async (
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void> => {
    const httpRequest: HttpRequest = { headers: request.headers }
    const { body, statusCode } = await middleware.handle(httpRequest)

    if (statusCode === 200) {
      next()
    } else {
      response.status(statusCode).json({
        ...body,
        error: body.message,
        stack: body.stack
      })
    }
  }
}
