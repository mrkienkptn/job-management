const { Joi } = require('express-validation')
const { customValidate } = require('../utils/validation')

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
module.exports = {
  createGroupValidate: customValidate(createGroup),
  getGroupsValidate: customValidate(getGroups),
  addMemberValidate: customValidate(addMember)
}
