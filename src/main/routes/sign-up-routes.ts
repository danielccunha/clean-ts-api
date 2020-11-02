import { Router } from 'express'

import { adaptRoute } from '../adapters/express-route-adapter'
import { makeSignUpController } from '../factories/sign-up/sign-up-factory'

export default (router: Router): void => {
  router.post('/sign-up', adaptRoute(makeSignUpController()))
}
