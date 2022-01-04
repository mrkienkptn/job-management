const { Router } = require('express')

const { notificationController: controller } = require('../../controllers')
const { notificationValidation: validation } = require('../../validations')
const { verifyToken, authorization } = require('../../middlewares')

const router = Router()

router
  .route('/')
  .get(verifyToken, validation.getONotificationValidate, controller.getONotification)

module.exports = router
