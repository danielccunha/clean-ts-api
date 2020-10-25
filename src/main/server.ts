import { MongoHelper } from '../infra/db/mongodb/helpers/helper'
import app from './config/app'
import env from './config/env'

const port = process.env.PORT || 3333

MongoHelper.connect(env.mongoUrl).then(() => {
  app.listen(port, () => {
    console.log(`Successfully started server on port \x1b[32m${port}\x1b[0m`)
  })
})
