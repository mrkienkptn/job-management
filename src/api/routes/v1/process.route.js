const { Router } = require('express')

const { processController: controller } = require('../../controllers')
const { processValidation: validation } = require('../../validations')
const { verifyToken, authorization } = require('../../middlewares')

const router = Router()

router
  .route('/:groupId')
  .post(verifyToken, authorization.Authorization, validation.addProcessValidate, controller.AddProcess)
router
  .route('/:groupId/:processId')
  .delete(verifyToken, authorization.Authorization, validation.removeProcessValidate, controller.RemoveProcess)
module.exports = router
