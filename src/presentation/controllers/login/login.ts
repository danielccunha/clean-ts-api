import {
  Controller,
  HttpRequest,
  HttpResponse,
  Authentication
} from './login-protocols'
import {
  badRequest,
  ok,
  serverError,
  unauthorized
} from '../../helpers/http/http-helper'
import { Validation } from '../sign-up/sign-up-protocols'

export class LoginController implements Controller {
  private readonly authentication: Authentication
  private readonly validation: Validation

  constructor(authentication: Authentication, validation: Validation) {
    this.authentication = authentication
    this.validation = validation
  }

  async handle({ body }: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(body)
      if (error) {
        return badRequest(error)
      }

      const { email, password } = body
      const accessToken = await this.authentication.auth(email, password)
      if (!accessToken) {
        return unauthorized()
      }

      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
