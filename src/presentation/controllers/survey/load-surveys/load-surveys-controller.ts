import { noContent, ok, serverError } from './../../../helpers/http/http-helper'
import { LoadSurveys } from './../../../../domain/use-cases/load-surveys'
import { Controller, HttpResponse } from './load-surveys-controller-protocols'

export class LoadSurveysController implements Controller {
  constructor(private readonly loadSurveys: LoadSurveys) {}

  async handle(): Promise<HttpResponse> {
    try {
      const surveys = await this.loadSurveys.load()
      return surveys.length ? ok(surveys) : noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
