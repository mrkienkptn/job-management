const bcrypt = require('bcrypt')

const saltRounds = 10

const salt = bcrypt.genSaltSync(saltRounds)

const genPassword = (plainPassword) => {
  const hash = bcrypt.hashSync(plainPassword, salt)
  return hash
}

const comparePassword = (plainPassword, hash) => {
  const match = bcrypt.compareSync(plainPassword, hash)
  return match
}

module.exports = {
  genPassword,
  comparePassword
}
