const { Router } = require('express')

const { userController: controller } = require('../../controllers')
const { userValidation: validation } = require('../../validations')

const router = Router()

router
  .route('/login')
  .post(validation.loginValidate, controller.Login)

router
  .route('/signup')
  .post(validation.signupValidate, controller.SignUp)

router.route('/users')
  .get(validation.getUsersValidate, controller.getUsers)

module.exports = router
