const { Joi } = require('express-validation')

const { customValidate } = require('../utils/validation')

const signup = {
  body: Joi.object({
    email: Joi
      .string()
      .email()
      .required(),
    password: Joi
      .string()
      .min(6)
      .required(),
    name: Joi
      .string()
      .required()
      .min(2)
  })
}

const login = {
  body: Joi.object({
    email: Joi
      .string()
      .email()
      .required(),
    password: Joi
      .string()
      .min(6)
      .required()
  })
}

const getUsers = {
  query: Joi.object({
    email: Joi
      .string()
      .required()
      .min(4)
  })
}

module.exports = {
  loginValidate: customValidate(login),
  signupValidate: customValidate(signup),
  getUsersValidate: customValidate(getUsers)
}
