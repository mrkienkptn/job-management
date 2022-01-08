const { Joi } = require('express-validation')
const { customValidate, joiPagination } = require('../utils/validation')
const VALID_ID = /^[a-f 0-9]{24}$/

const getONotification = {
  query: Joi.object({
    ...joiPagination
  })
}

module.exports = {
  getONotificationValidate: customValidate(getONotification)
}
