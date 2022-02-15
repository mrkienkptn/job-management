const { Router } = require('express')

const { taskController: controller } = require('../../controllers')
const { taskValidation: validation } = require('../../validations')
const { verifyToken, authorization: { adminAuth, memberAuth } } = require('../../middlewares')

const router = Router()

router
  .route('/:groupId/:processId')
  .post(verifyToken, validation.addTaskValidate, memberAuth, controller.addTask)
router
  .route('/:groupId/:processId/:taskId')
  .delete(verifyToken, validation.deleteTaskValidate, adminAuth, controller.deleteTask)
router
  .route('/details/:groupId/:taskId')
  .get(verifyToken, validation.getTaskValidate, memberAuth, controller.getTask)
  .put(verifyToken, validation.editTaskValidate, memberAuth, controller.updateTask)
router
  .route('/assignees/:groupId/:taskId')
  .put(verifyToken, validation.editTaskUserValidate, memberAuth, controller.addAssignee)
router
  .route('/assignees/remove/:groupId/:taskId')
  .put(verifyToken, validation.editTaskUserValidate, memberAuth, controller.removeAssignee)
router
  .route('/followers/:groupId/:taskId')
  .put(verifyToken, validation.editTaskUserValidate, memberAuth, controller.addFollower)
router
  .route('/followers/remove/:groupId/:taskId')
  .put(verifyToken, validation.editTaskUserValidate, memberAuth, controller.removeFollower)

module.exports = router
