import {
  Controller,
  HttpRequest,
  HttpResponse,
  Authentication,
  Validation
} from './login-controller-protocols'
import {
  badRequest,
  ok,
  serverError,
  unauthorized
} from '../../helpers/http/http-helper'

export class LoginController implements Controller {
  constructor(
    private readonly authentication: Authentication,
    private readonly validation: Validation
  ) {}

  async handle({ body }: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(body)
      if (error) {
        return badRequest(error)
      }

      const { email, password } = body
      const accessToken = await this.authentication.auth({ email, password })
      if (!accessToken) {
        return unauthorized()
      }

      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
