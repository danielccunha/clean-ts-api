import express from 'express'

const app = express()
const port = process.env.PORT || 3333

app.listen(port, () => {
  return console.log(`Server is running at http://localhost:${port}`)
})
