import {
  HttpRequest,
  HttpResponse,
  Controller,
  AddAccount,
  Validation
} from './sign-up-controller-protocols'
import { badRequest, serverError, ok } from '../../helpers/http/http-helper'

export class SignUpController implements Controller {
  constructor(
    private readonly addAccount: AddAccount,
    private readonly validation: Validation
  ) {}

  async handle({ body }: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(body)
      if (error) {
        return badRequest(error)
      }

      const account = await this.addAccount.add({
        name: body.name,
        email: body.email,
        password: body.password
      })

      return ok(account)
    } catch (error) {
      return serverError(error)
    }
  }
}
