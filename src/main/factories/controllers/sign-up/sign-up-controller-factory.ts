import { SignUpController } from '../../../../presentation/controllers/login/sign-up/sign-up-controller'
import { Controller } from '../../../../presentation/protocols'
import { makeSignUpValidation } from './sign-up-validation-factory'
import { makeDbAuthentication } from '../../use-cases/authentication/db-authentication-factory'
import { makeDbAddAccount } from '../../use-cases/add-account/db-add-account-factory'
import { makeLogControllerDecorator } from '../../decorators/log-controller-decorator-factory'

export const makeSignUpController = (): Controller => {
  const controller = new SignUpController(
    makeDbAddAccount(),
    makeSignUpValidation(),
    makeDbAuthentication()
  )

  return makeLogControllerDecorator(controller)
}
