import {
  Controller,
  HttpRequest,
  HttpResponse
} from './add-survey-controller-protocols'
import { ok, serverError } from '../../../helpers/http/http-helper'
import { Validation } from '../../../protocols'

export class AddSurveyController implements Controller {
  constructor(private validation: Validation) {}

  async handle({ body }: HttpRequest): Promise<HttpResponse> {
    try {
      this.validation.validate(body)
      return ok({})
    } catch (error) {
      return serverError(error)
    }
  }
}
