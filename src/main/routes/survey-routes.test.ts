import request from 'supertest'
import { Collection } from 'mongodb'

import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import app from '../config/app'

let surveyCollection: Collection

describe('Survey Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
    surveyCollection = await MongoHelper.getCollection('surveys')
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    await surveyCollection.deleteMany({})
  })

  describe('POST /surveys', () => {
    test('Should return 204 on add survey success', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          question: 'Question',
          answers: [
            {
              answer: 'Answer 1',
              image: 'https://some-image.com'
            },
            {
              answer: 'Answer 2'
            }
          ]
        })
        .expect(204)
    })
  })
})
