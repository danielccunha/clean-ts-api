import {
  HttpRequest,
  HttpResponse,
  Controller,
  AddAccount,
  Validation
} from './sign-up-controller-protocols'
import { badRequest, serverError, ok } from '../../helpers/http/http-helper'
import { Authentication } from '../login/login-controller-protocols'

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
      await this.authentication.auth({ email, password })

      return ok(account)
    } catch (error) {
      return serverError(error)
    }
  }
}
