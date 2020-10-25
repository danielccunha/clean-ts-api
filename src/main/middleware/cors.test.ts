import request from 'supertest'

import app from '../config/app'

describe('CORS Middleware', () => {
  test('Should enable CORS', async () => {
    app.get('/test', (_req, res) => res.send())
    await request(app).get('/').expect('access-control-allow-origin', '*')
  })
})
