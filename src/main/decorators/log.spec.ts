import { Controller, HttpResponse } from '../../presentation/protocols'
import { LogControllerDecorator } from './log'

const makeSut = () => {
  class ControllerStub implements Controller {
    async handle(): Promise<HttpResponse> {
      return { statusCode: 204, body: 'no_content' }
    }
  }

  const controllerStub = new ControllerStub()
  const sut = new LogControllerDecorator(controllerStub)
  return { sut, controllerStub }
}

describe('LogController Decorator', () => {
  test('Should call controller handle', async () => {
    const { sut, controllerStub } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
    const request = { body: 'any_body' }
    await sut.handle(request)
    expect(handleSpy).toHaveBeenCalledWith(request)
  })
})
