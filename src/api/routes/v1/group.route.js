const { Router } = require('express')

const { groupController: controller } = require('../../controllers')
const { groupValidation: validation } = require('../../validations')
const { verifyToken, authorization } = require('../../middlewares')

const router = Router()

router
  .route('/')
  .post(verifyToken, validation.createGroupValidate, controller.CreateGroup)
  .get(verifyToken, controller.GetGroups)
router
  .route('/:groupId')
  .get(verifyToken, validation.getGroupValidate, authorization.memberAuth, controller.getGroup)
router
  .route('/members/add/:groupId')
  .put(verifyToken, validation.addMemberValidate, authorization.adminAuth, controller.AddMember)
router
  .route('/members/remove/:groupId:/memberId')

router
  .route('/processes-dragging/:groupId')
  .put(verifyToken, validation.dragProcessValidate, authorization.memberAuth, controller.dragProcess)
module.exports = router
