import { Router } from 'express'

import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeLoginController } from '../factories/controllers/login/login-controller-factory'
import { makeSignUpController } from '../factories/controllers/sign-up/sign-up-controller-factory'

export default (router: Router): void => {
  router.post('/sign-up', adaptRoute(makeSignUpController()))
  router.post('/login', adaptRoute(makeLoginController()))
}
