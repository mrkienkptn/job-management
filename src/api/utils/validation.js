const { Joi, validate } = require('express-validation')

const { pagination } = require('../../config/vars')

const validateOptionsDefault = {
  context: true,
  keyByField: true
}

const joiPagination = {
  page: Joi.number()
    .integer()
    .min(1)
    .default(pagination.page),
  records: Joi.number()
    .integer()
    .min(1)
    .default(pagination.records)
}

const customValidate = (schema, options, joiOptions) => {
  return validate(schema, { ...validateOptionsDefault, ...options }, joiOptions)
}

module.exports = {
  joiPagination,
  customValidate
}
