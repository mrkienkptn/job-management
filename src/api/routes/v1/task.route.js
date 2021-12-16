const { Router } = require('express')

const { taskController: controller } = require('../../controllers')
const { taskValidation: validation } = require('../../validations')
const { verifyToken, authorization } = require('../../middlewares')

const router = Router()

router
  .route('/:groupId/:processId')
  .post(verifyToken, validation.addTaskValidate, authorization.memberAuth, controller.addTask)
  .get(verifyToken, validation.getTaskValidate, authorization.memberAuth, controller.getTask)

module.exports = router
