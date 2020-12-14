import {
  LoadSurveysRepository,
  SurveyModel,
  LoadSurveys
} from './db-load-surveys-protocols'

export class DbLoadSurveys implements LoadSurveys {
  constructor(private readonly loadSurveysRepository: LoadSurveysRepository) {}

  load(): Promise<SurveyModel[]> {
    return this.loadSurveysRepository.loadAll()
  }
}
