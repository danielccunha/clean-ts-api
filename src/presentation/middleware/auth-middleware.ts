import { LoadAccountByToken } from './../../domain/use-cases/load-account-by-token'
import { AccessDeniedError } from './../errors/access-denied-error'
import { forbidden } from './../helpers/http/http-helper'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { Middleware } from './../protocols/middleware'

export class AuthMiddleware implements Middleware {
  constructor(private readonly loadAccountByToken: LoadAccountByToken) {}

  async handle({ headers = {} }: HttpRequest): Promise<HttpResponse> {
    const accessToken = headers['x-access-token']
    if (!accessToken) {
      return forbidden(new AccessDeniedError())
    }

    await this.loadAccountByToken.load(accessToken)
  }
}
