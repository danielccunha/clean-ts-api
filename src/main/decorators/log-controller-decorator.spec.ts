import { LogErrorRepository } from '../../data/protocols/db/log/log-error-repository'
import { ok, serverError } from '../../presentation/helpers/http/http-helper'
import { Controller, HttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './log-controller-decorator'

const makeControllerStub = () => {
  class ControllerStub implements Controller {
    async handle(): Promise<HttpResponse> {
      return { statusCode: 200, body: 'any_body' }
    }
  }

  return new ControllerStub()
}

const makeLogErrorRepositoryStub = () => {
  class LogErrorRepositoryStub implements LogErrorRepository {
    logError(): Promise<void> {
      return Promise.resolve()
    }
  }

  return new LogErrorRepositoryStub()
}

const makeSut = () => {
  const controllerStub = makeControllerStub()
  const logErrorRepositoryStub = makeLogErrorRepositoryStub()
  const sut = new LogControllerDecorator(controllerStub, logErrorRepositoryStub)
  return { sut, controllerStub, logErrorRepositoryStub }
}

describe('LogController Decorator', () => {
  test('Should call controller handle', async () => {
    const { sut, controllerStub } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    const request = { body: 'any_body' }
    await sut.handle(request)
    expect(handleSpy).toHaveBeenCalledWith(request)
  })

  test('Should return the same result of the controller', async () => {
    const { sut } = makeSut()
    const request = { body: 'any_body' }
    const response = await sut.handle(request)
    expect(response).toEqual(ok('any_body'))
  })

  test('Should call LogErrorRepository with correct error if controller returns a server error', async () => {
    const { sut, controllerStub, logErrorRepositoryStub } = makeSut()
    const error = serverError(new Error())
    const logSpy = jest.spyOn(logErrorRepositoryStub, 'logError')
    jest
      .spyOn(controllerStub, 'handle')
      .mockReturnValueOnce(Promise.resolve(error))
    await sut.handle({ body: 'any_body' })
    expect(logSpy).toHaveBeenCalledWith(error.body.stack)
  })
})
