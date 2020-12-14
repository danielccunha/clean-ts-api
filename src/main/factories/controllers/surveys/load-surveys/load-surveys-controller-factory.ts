import { makeDbLoadSurveys } from './../../../use-cases/survey/load-surveys/db-load-surveys'
import { makeLogControllerDecorator } from './../../../decorators/log-controller-decorator-factory'
import { LoadSurveysController } from './../../../../../presentation/controllers/survey/load-surveys/load-surveys-controller'
import { Controller } from '../../../../../presentation/protocols'

export const makeLoadSurveysController = (): Controller => {
  const controller = new LoadSurveysController(makeDbLoadSurveys())
  return makeLogControllerDecorator(controller)
}
