import bcrypt from 'bcrypt'

import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  hash: async () => 'hashed_value'
}))

const makeSut = () => {
  const salt = 12
  const sut = new BcryptAdapter(salt)
  return { sut, salt }
}

describe('Bcrypt Adapter', () => {
  test('Should call bcrypt with correct values', async () => {
    const { sut, salt } = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')

    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('Should return a hash on success', async () => {
    const { sut } = makeSut()
    const hash = await sut.encrypt('any_value')

    expect(hash).toBe('hashed_value')
  })
})
