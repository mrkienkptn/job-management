const { User }= require('../models')

const getUser = email => {
  const user = User.findOne({ email: email })
  return user
}
const createUser = (email, hash, name) => {
  const user = new User()
  user.email = email
  user.password = hash
  user.name = name

  return user.save()
}
module.exports = {
  getUser,
  createUser
}
