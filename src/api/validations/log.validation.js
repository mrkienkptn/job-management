const { Joi } = require('express-validation')

const { customValidate, joiPagination } = require('../utils/validation')

const getLog = {
  params: Joi.object({
    logId: Joi.number()
      .integer()
      .min(1)
      .required()
  })
}

const getLogs = {
  query: Joi.object({
    name: Joi.string().trim(),
    ...joiPagination
  })
}

module.exports = {
  getLogValidate: customValidate(getLog),
  getLogsValidate: customValidate(getLogs)
}
