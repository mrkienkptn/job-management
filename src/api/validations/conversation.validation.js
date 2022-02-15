const { Joi } = require('express-validation')
const { customValidate } = require('../utils/validation')
const VALID_ID = /^[a-f 0-9]{24}$/

const getConversation = {
  params: Joi.object(
    {
      groupId: Joi
        .string()
        .required()
        .regex(VALID_ID),
      conversationId: Joi
        .string()
        .required()
        .regex(VALID_ID)
    }
  ),
  query: Joi.object(
    {
      s: Joi.number().min(0).required(),
      e: Joi.number().min(1).required()
    }
  )
}

const addMessage = {
  params: Joi.object(
    {
      groupId: Joi
        .string()
        .required()
        .regex(VALID_ID),
      conversationId: Joi
        .string()
        .required()
        .regex(VALID_ID)
    }
  ),
  body: Joi.object(
    {
      senderId: Joi
        .string()
        .required()
        .regex(VALID_ID),
      content: Joi
        .string()
        .required()
    }
  )
}

module.exports = {
  getConversationValidate: customValidate(getConversation),
  addMessageValidate: customValidate(addMessage)
}
