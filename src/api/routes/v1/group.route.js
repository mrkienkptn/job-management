const { Router } = require('express')

const { groupController: controller } = require('../../controllers')
const { groupValidation: validation } = require('../../validations')
const { verifyToken } = require('../../middlewares')

const router = Router()

router
  .route('/')
  .post(verifyToken, validation.createGroupValidate, controller.CreateGroup)
  .get(verifyToken, controller.GetGroups)
router
  .route('/members/add/:groupId')
  .put(verifyToken, validation.addMemberValidate, controller.AddMember)
router
  .route('/members/remove/:groupId:/memberId')
module.exports = router
