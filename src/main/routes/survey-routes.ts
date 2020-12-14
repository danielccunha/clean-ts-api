import { adminAuth } from './../middleware/admin-auth'
import { auth } from './../middleware/auth'
import { makeLoadSurveysController } from './../factories/controllers/surveys/load-surveys/load-surveys-controller-factory'
import { Router } from 'express'

import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeAddSurveyController } from '../factories/controllers/surveys/add-survey/add-survey-controller-factory'

export default (router: Router): void => {
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))
  router.get('/surveys', auth, adaptRoute(makeLoadSurveysController()))
}
