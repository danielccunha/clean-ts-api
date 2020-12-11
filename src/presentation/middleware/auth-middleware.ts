import { LoadAccountByToken } from './../../domain/use-cases/load-account-by-token'
import { AccessDeniedError } from './../errors/access-denied-error'
import { forbidden, ok, serverError } from './../helpers/http/http-helper'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { Middleware } from './../protocols/middleware'

export class AuthMiddleware implements Middleware {
  constructor(
    private readonly loadAccountByToken: LoadAccountByToken,
    private readonly role?: string
  ) {}

  async handle({ headers = {} }: HttpRequest): Promise<HttpResponse> {
    try {
      const accessToken = headers['x-access-token']
      if (!accessToken) {
        return forbidden(new AccessDeniedError())
      }

      const account = await this.loadAccountByToken.load(accessToken, this.role)
      if (!account) {
        return forbidden(new AccessDeniedError())
      }

      return ok({ accountId: account.id })
    } catch (error) {
      return serverError(error)
    }
  }
}
