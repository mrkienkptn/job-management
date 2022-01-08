const { Router } = require('express')

const { processController: controller } = require('../../controllers')
const { processValidation: validation } = require('../../validations')
const { verifyToken, authorization } = require('../../middlewares')

const router = Router()

router
  .route('/:groupId')
  .post(verifyToken, validation.addProcessValidate, authorization.adminAuth, controller.AddProcess)
router
  .route('/actions/:groupId/:processId')
  .put(verifyToken, validation.editProcessValidate, authorization.adminAuth, controller.EditProcess)
  .delete(verifyToken, validation.removeProcessValidate, authorization.adminAuth, controller.RemoveProcess)
router
  .route('/tasks-dragging/:groupId')
  .put(verifyToken, validation.dragTaskValidate, authorization.memberAuth, controller.DragTask)
  
module.exports = router
