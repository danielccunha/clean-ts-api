import app from './config/app'

const port = process.env.PORT || 3333

app.listen(port, () => {
  console.log(`Successfully started server on port \x1b[32m${port}\x1b[0m`)
})
