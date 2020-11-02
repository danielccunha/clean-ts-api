import request from 'supertest'
import { Collection } from 'mongodb'
import { hash } from 'bcrypt'

import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

let accountCollection: Collection

describe('Login Routes', () => {
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

  describe('POST /sign-up', () => {
    test('Should return 200 on sign up', async () => {
      await request(app)
        .post('/api/sign-up')
        .send({
          name: 'Daniel',
          email: 'daniel@exemplo.com',
          password: '123',
          passwordConfirmation: '123'
        })
        .expect(200)
    })
  })

  describe('POST /login', () => {
    test('Should return 200 on login', async () => {
      const password = await hash('123', 12)
      await accountCollection.insertOne({
        name: 'Daniel',
        email: 'daniel@exemplo.com',
        password
      })
      await request(app)
        .post('/api/login')
        .send({
          email: 'daniel@exemplo.com',
          password: '123'
        })
        .expect(200)
    })

    test('Should return 401 on login', async () => {
      await request(app)
        .post('/api/login')
        .send({
          email: 'daniel@exemplo.com',
          password: '123'
        })
        .expect(401)
    })
  })
})
