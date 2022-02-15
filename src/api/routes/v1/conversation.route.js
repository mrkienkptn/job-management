const { Router } = require('express')

const { conversationController: controller } = require('../../controllers')
const { conversationValidation: validation } = require('../../validations')
const { verifyToken, authorization: { memberAuth, adminAuth } } = require('../../middlewares')

const router = Router()

router
  .route('/:groupId/:conversationId')
  .get(verifyToken, validation.getConversationValidate, memberAuth, controller.getConversation)
router
  .route('/messages/:groupId/:conversationId')
  .post(verifyToken, validation.addMessageValidate, memberAuth, controller.addMessage)

module.exports = router
