const path = require('path')

require('dotenv-safe').config({
  path: path.join(__dirname, '../../.env'),
  sample: path.join(__dirname, '../../.env.example')
})

module.exports = {
  env: process.env.NODE_ENV || 'test',
  port: process.env.PORT || 8000,
  mongo: {
    uri:
      process.env.NODE_ENV === 'test'
        ? process.env.MONGO_URI_TESTS
        : process.env.MONGO_URI
  },
  logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
  pagination: {
    page: process.env.PAGINATION_PAGE || 1,
    records: process.env.PAGINATION_RECORD || 20
  },
  authConfig: {
    url: process.env.AUTH_CALLBACK_URL || 'http://localhost:3001/auth/v1',
    secretKey:
      process.env.AUTH_SECRET_KEY || 'bA2xcjpf8y5aSUFsNB2qN5yymUBSs6es3q',
    expireCode: process.env.AUTH_EXPIRE_CODE || 419
  },
  googleAuth: {
    clientId: '183648768881-o6r8dvf9tqkcs5s1peubbbif90cmhod0.apps.googleusercontent.com',
    secret: 'TJ-WhmCJ9f_5iSZY2LIHh_JD',
    redirectUri: 'http://localhost:8000/'
  }
}
