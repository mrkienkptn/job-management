const httpStatus = require('http-status')
const getApiResponse = require('../utils/response')
const passwordUtils = require('../utils/password')
const genToken = require('../utils/gen-token')
const { userRepo } = require('../repo')

const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const {
      authConfig: { secretKey }
    } = req
    const user = await userRepo.getUser(email)
    if (user) {
      const matchPassword = passwordUtils.comparePassword(password, user.password)
      if (matchPassword) {
        const payload = {
          id: user.id,
          password: user.password
        }
        const accessToken = genToken(payload, secretKey)
        return res.status(httpStatus.OK).json(getApiResponse({ data: { user, accessToken } }))
      } else {
        return res.status(httpStatus.NOT_FOUND).json(getApiResponse({ msg: 'Password is not match' }))
      }
    } else {
      return res.status(httpStatus.NOT_FOUND).json(getApiResponse({ data: { user: 'Email is not exist' } }))
    }
  } catch (error) {
    next(error)
  }
}

const SignUp = async (req, res, next) => {
  try {
    const { email, password, name } = req.body
    const user = await userRepo.getUser(email)
    if (user !== null) {
      return res.status(httpStatus.NOT_FOUND).json(getApiResponse({ msg: 'Exist' }))
    } else {
      const hash = passwordUtils.genPassword(password)
      userRepo.createUser(email, hash, name)
        .then((newUser) => {
          console.log(newUser)
          return res.status(httpStatus.OK).json(getApiResponse({ data: newUser }))
        })
        .catch((error) => {
          console.log(error)
          return res.status(httpStatus.NOT_FOUND).json(getApiResponse({ data: error }))
        })
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  Login,
  SignUp
}
