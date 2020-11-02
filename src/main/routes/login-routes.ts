import { Router } from 'express'

import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makeLoginController } from '../factories/login/login-factory'
import { makeSignUpController } from '../factories/sign-up/sign-up-factory'

export default (router: Router): void => {
  router.post('/sign-up', adaptRoute(makeSignUpController()))
  router.post('/login', adaptRoute(makeLoginController()))
}
