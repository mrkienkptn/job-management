const { Joi } = require('express-validation')

const { customValidate } = require('../utils/validation')
const VALID_ID = /^[a-f 0-9]{24}$/i
const addTask = {
  params: Joi.object({
    processId: Joi
      .string()
      .required()
      .regex(VALID_ID)
  }),
  body: Joi.object({
    title: Joi
      .string()
      .required(),
    description: Joi
      .string(),
    asignees: Joi
      .array()
      .items(
        Joi
          .string()
          .regex(VALID_ID)
      )
      .single(),
    followers: Joi
      .array()
      .items(
        Joi
          .string()
          .regex(VALID_ID)
      )
      .single(),
    dueDate: Joi
      .date(),
    tags: Joi
      .array()
      .items(
        Joi
          .string()
          .regex(VALID_ID)
      )
      .single(),
    checkList: Joi
      .array()
      .items(
        Joi
          .array()
          .items({
            name: Joi.string().required(),
            value: Joi.boolean().default(false)
          })
          .single()
      )
      .single()
  })
}

const editTask = {
  params: Joi.object({
    taskId: Joi
      .string()
      .required()
      .regex(VALID_ID)
  }),
  body: Joi.object({
    title: Joi
      .string()
      .required(),
    description: Joi
      .string(),
    asignees: Joi
      .array()
      .items(
        Joi
          .string()
          .regex(VALID_ID)
      )
      .single(),
    followers: Joi
      .array()
      .items(
        Joi
          .string()
          .regex(VALID_ID)
      )
      .single(),
    dueDate: Joi
      .date(),
    tags: Joi
      .array()
      .items(
        Joi
          .string()
          .regex(VALID_ID)
      )
      .single(),
    checkList: Joi
      .array()
      .items(
        Joi
          .array()
          .items({
            name: Joi.string().required(),
            value: Joi.boolean().default(false)
          })
          .single()
      )
      .single()
  })
}
const deleteTask = {
  params: Joi.object({
    taskId: Joi
      .string()
      .required()
      .regex(VALID_ID),
    processId: Joi
      .string()
      .required()
      .regex(VALID_ID),
    groupId: Joi
      .string()
      .required()
      .regex(VALID_ID)
  })

}
module.exports = {
  addTaskValidate: customValidate(addTask),
  editTaskValidate: customValidate(editTask),
  deleteTaskValidate: customValidate(deleteTask)
}
