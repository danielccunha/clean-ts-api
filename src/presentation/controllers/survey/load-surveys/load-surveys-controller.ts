import { LoadSurveys } from './../../../../domain/use-cases/load-surveys'
import { Controller, HttpResponse } from './load-surveys-controller-protocols'

export class LoadSurveysController implements Controller {
  constructor(private readonly loadSurveys: LoadSurveys) {}

  async handle(): Promise<HttpResponse> {
    await this.loadSurveys.load()
    return null
  }
}
