import { readdirSync } from 'fs'
import { Express, Router } from 'express'

export default (app: Express): void => {
  const router = Router()
  app.use('/api', router)

  readdirSync(`${__dirname}/../routes`).forEach(async file => {
    if (!file.includes('.test.')) {
      const { default: route } = await import(`../routes/${file}`)
      route(router)
    }
  })
}
