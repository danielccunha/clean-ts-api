export default {
  mongoUrl:
    process.env.MONGO_URL ||
    'mongodb://docker:docker@localhost:27017/clean-ts-api?authSource=admin',
  port: process.env.PORT || 3333
}
