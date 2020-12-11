import { AccessDeniedError } from './../errors/access-denied-error'
import { forbidden } from './../helpers/http/http-helper'
import { HttpRequest, HttpResponse } from '../protocols/http'
import { Middleware } from './../protocols/middleware'

export class AuthMiddleware implements Middleware {
  async handle({ headers }: HttpRequest): Promise<HttpResponse> {
    return forbidden(new AccessDeniedError())
  }
}
