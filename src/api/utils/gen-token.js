const jwt = require('jsonwebtoken')

const genToken = (payload, secretKey) => {
  const token = jwt.sign(payload, secretKey, { expiresIn: '10days' })
  return token
}

module.exports = genToken
