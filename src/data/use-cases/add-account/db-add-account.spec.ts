import { AddAccountModel } from '../../../domain/use-cases/add-account'
import { DbAddAccount } from './db-add-account'

const makeEncrypterStub = () => {
  class EncrypterStub {
    async encrypt(): Promise<string> {
      return 'hashed_value'
    }
  }

  return new EncrypterStub()
}

const makeSut = () => {
  const encrypterStub = makeEncrypterStub()
  const sut = new DbAddAccount(encrypterStub)

  return { sut, encrypterStub }
}

describe('DbAddCount UseCase', () => {
  test('Should call Encrypter with correct password', async () => {
    const { sut, encrypterStub } = makeSut()
    const encryptSpy = jest.spyOn(encrypterStub, 'encrypt')
    const accountData: AddAccountModel = {
      name: 'valid_name',
      email: 'valid_email',
      password: 'valid_password'
    }

    await sut.add(accountData)
    expect(encryptSpy).toHaveBeenCalledWith('valid_password')
  })
})
