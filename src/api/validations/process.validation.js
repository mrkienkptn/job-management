const { Joi } = require('express-validation')
const { customValidate } = require('../utils/validation')
const VALID_ID = /^[a-f 0-9]{24}$/i
const addProcess = {
  params: Joi.object({
    groupId: Joi
      .string()
  }),
  body: Joi.object({
    name: Joi
      .string()
      .required()
  })
}

const removeProcess = {
  params: Joi.object({
    groupId: Joi
      .string()
      .required()
      .regex(VALID_ID),
    processId: Joi
      .string()
      .required()
      .regex(VALID_ID)
  })
}

const editProcess = {
  params: Joi.object({
    processId: Joi
      .string()
      .required()
  }),
  body: Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    tasks: Joi
      .array()
      .items(
        Joi
          .string()
          .regex(VALID_ID)
      )
  })
}
module.exports = {
  addProcessValidate: customValidate(addProcess),
  removeProcessValidate: customValidate(removeProcess),
  editProcessValidate: customValidate(editProcess)
}
