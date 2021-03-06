import {
  HttpRequest,
  HttpResponse,
  Controller,
  AddAccount,
  Validation
} from './sign-up-controller-protocols'
import {
  badRequest,
  serverError,
  ok,
  forbidden
} from '../../../helpers/http/http-helper'
import { Authentication } from '../login/login-controller-protocols'
import { EmailInUseError } from '../../../errors'

export class SignUpController implements Controller {
  constructor(
    private readonly addAccount: AddAccount,
    private readonly validation: Validation,
    private readonly authentication: Authentication
  ) {}

  async handle({ body }: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(body)
      if (error) {
        return badRequest(error)
      }

      const { name, email, password } = body
      const account = await this.addAccount.add({ name, email, password })

      if (!account) {
        return forbidden(new EmailInUseError())
      }

      const accessToken = await this.authentication.auth({ email, password })

      return ok({ accessToken })
    } catch (error) {
      return serverError(error)
    }
  }
}
