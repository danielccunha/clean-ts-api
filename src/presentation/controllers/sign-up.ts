import {
  HttpRequest,
  HttpResponse,
  Controller,
  EmailValidator
} from '../protocols'
import { badRequest, serverError } from '../helpers/http-helper'
import { InvalidParamError, MissingParamError } from '../errors'
import { AddAccount } from '../../domain/use-cases/add-account'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  private readonly addAccount: AddAccount

  constructor(emailValidator: EmailValidator, addAccount: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccount = addAccount
  }

  handle({ body }: HttpRequest): HttpResponse {
    try {
      const requiredFields = [
        'name',
        'email',
        'password',
        'passwordConfirmation'
      ]

      for (const field of requiredFields) {
        if (!body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      if (body.password !== body.passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      if (!this.emailValidator.isValid(body.email)) {
        return badRequest(new InvalidParamError('email'))
      }

      this.addAccount.add({
        name: body.name,
        email: body.email,
        password: body.password
      })
    } catch (error) {
      return serverError()
    }
  }
}
