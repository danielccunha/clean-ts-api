import {
  AddSurvey,
  Controller,
  HttpRequest,
  HttpResponse
} from './add-survey-controller-protocols'
import { badRequest, ok, serverError } from '../../../helpers/http/http-helper'
import { Validation } from '../../../protocols'

export class AddSurveyController implements Controller {
  constructor(private validation: Validation, private addSurvey: AddSurvey) {}

  async handle({ body }: HttpRequest): Promise<HttpResponse> {
    try {
      const error = this.validation.validate(body)
      if (error) {
        return badRequest(error)
      }

      const { question, answers } = body
      await this.addSurvey.add({ question, answers })

      return ok({})
    } catch (error) {
      return serverError(error)
    }
  }
}
