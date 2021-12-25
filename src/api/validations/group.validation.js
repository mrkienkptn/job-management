const { Joi } = require('express-validation')
const { customValidate } = require('../utils/validation')
const VALID_ID = /^[a-f 0-9]{24}$/i
const createGroup = {
  body: Joi.object({
    name: Joi
      .string()
      .min(3)
      .required(),
    description: Joi
      .string()
  })
}
const getGroups = {
  params: Joi.object({
    userId: Joi
      .string()
      .required()
  })
}

const addMember = {
  params: Joi.object({
    groupId: Joi
      .string()
      .required()
  }),
  body: Joi.object({
    memberId: Joi
      .string()
      .required()
  })
}

const getGroup = {
  params: Joi.object({
    groupId: Joi
      .string()
      .required()
      .regex(VALID_ID)
  })
}

const dragProcess = {
  params: Joi.object({
    groupId: Joi
      .string()
      .required()
      .regex(VALID_ID)
  }),
  body: Joi.object({
    fromPosition: Joi.number().required().min(0),
    toPosition: Joi.number().required().min(0),
    processId: Joi
      .string()
      .required()
      .regex(VALID_ID)
  })
}

module.exports = {
  createGroupValidate: customValidate(createGroup),
  getGroupsValidate: customValidate(getGroups),
  addMemberValidate: customValidate(addMember),
  getGroupValidate: customValidate(getGroup),
  dragProcessValidate: customValidate(dragProcess)
}
