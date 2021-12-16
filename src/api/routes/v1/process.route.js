const { Router } = require('express')

const { processController: controller } = require('../../controllers')
const { processValidation: validation } = require('../../validations')
const { verifyToken, authorization } = require('../../middlewares')

const router = Router()

router
  .route('/:groupId')
  .post(verifyToken, authorization.adminAuth, validation.addProcessValidate, controller.AddProcess)
  .get(verifyToken, authorization.groupMemberAuth, validation.getProcessValidate, controller.getProcess )
router
  .route('/:groupId/:processId')
  .delete(verifyToken, authorization.adminAuth, validation.removeProcessValidate, controller.RemoveProcess)
module.exports = router
