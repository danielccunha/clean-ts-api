import { Collection } from 'mongodb'
import { MongoHelper } from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account-mongo-repository'

const makeSut = () => {
  const sut = new AccountMongoRepository()
  return { sut }
}

let accountCollection: Collection

describe('Account Mongo Repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    accountCollection = await MongoHelper.getCollection('accounts')
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    await accountCollection.deleteMany({})
  })

  test('Should return an account on add success', async () => {
    const { sut } = makeSut()
    const account = await sut.add({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_password')
  })

  test('Should return an account on loadByEmail success', async () => {
    const { sut } = makeSut()
    await accountCollection.insertOne({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password'
    })
    const account = await sut.loadByEmail('any_email@mail.com')
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_password')
  })

  test('Should return an account if loadByEmail fails', async () => {
    const { sut } = makeSut()
    const account = await sut.loadByEmail('any_email@mail.com')
    expect(account).toBeFalsy()
  })

  test('Should update the account accessToken on updateAccessToken success', async () => {
    const { sut } = makeSut()
    let [account] = (
      await accountCollection.insertOne({
        name: 'any_name',
        email: 'any_email@mail.com',
        password: 'any_password'
      })
    ).ops
    expect(account.accessToken).toBeFalsy()
    await sut.updateAccessToken(account._id, 'any_token')
    account = await accountCollection.findOne({ _id: account._id })
    expect(account).toBeTruthy()
    expect(account.accessToken).toBe('any_token')
  })

  test('Should return an account on loadByToken without role', async () => {
    const { sut } = makeSut()
    await accountCollection.insertOne({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      accessToken: 'any_token'
    })
    const account = await sut.loadByToken('any_token')
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_password')
  })

  test('Should return an account on loadByToken admin with role', async () => {
    const { sut } = makeSut()
    await accountCollection.insertOne({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      accessToken: 'any_token',
      role: 'admin'
    })
    const account = await sut.loadByToken('any_token', 'admin')
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_password')
  })

  test('Should return null on loadByToken with invalid role', async () => {
    const { sut } = makeSut()
    await accountCollection.insertOne({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      accessToken: 'any_token'
    })
    const account = await sut.loadByToken('any_token', 'admin')
    expect(account).toBeFalsy()
  })

  test('Should return an account on loadByToken if user is admin', async () => {
    const { sut } = makeSut()
    await accountCollection.insertOne({
      name: 'any_name',
      email: 'any_email@mail.com',
      password: 'any_password',
      accessToken: 'any_token',
      role: 'admin'
    })
    const account = await sut.loadByToken('any_token')
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@mail.com')
    expect(account.password).toBe('any_password')
  })

  test('Should return null on loadByToken if loadByToken fails', async () => {
    const { sut } = makeSut()
    const account = await sut.loadByToken('any_token')
    expect(account).toBeFalsy()
  })
})
