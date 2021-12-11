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
          id: user.id
        }
        const accessToken = genToken(payload, secretKey)
        return res.status(httpStatus.OK).json(getApiResponse({ data: { user, accessToken } }))
      } else {
        return res.status(httpStatus.NOT_FOUND).json(getApiResponse({ msg: 'Password is not match' }))
      }
    } else {
      return res.status(httpStatus.NOT_FOUND).json(getApiResponse({ data: { user: 'none' } }))
    }
  } catch (error) {
    next(error)
  }
}

const SignUp = async (req, res, next) => {
  try {
    const {
      authConfig: { secretKey }
    } = req
    const { email, password, name } = req.body
    const user = await userRepo.getUser(email)
    if (user) {
      return res.status(httpStatus.BAD_REQUEST).json(getApiResponse({ msg: 'Exist' }))
    } else {
      const hash = passwordUtils.genPassword(password)
      userRepo.createUser(email, hash, name)
        .then((newUser) => {
          const payload = {
            id: newUser.id
          }
          const accessToken = genToken(payload, secretKey)
          return res.status(httpStatus.OK).json(getApiResponse({ data: { user: newUser, accessToken } }))
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
