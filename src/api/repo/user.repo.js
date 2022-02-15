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

const getUsers = async (email) => {
  const users = await User.find(
    { email: { $regex: new RegExp(email, 'i') } },
    { "_id": 1, "name": 1, "email": 1 }
  )
  return users
}

module.exports = {
  getUser,
  createUser,
  getUsers
}
