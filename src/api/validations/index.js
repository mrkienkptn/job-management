const userValidation = require('./user.validation')
const groupValidation = require('./group.validation')
const processValidation = require('./process.validation')
const taskValidation = require('./task.validation')
const notificationValidation = require('./notification.validation')
const conversationValidation = require('./conversation.validation')

module.exports = {
  userValidation,
  groupValidation,
  processValidation,
  taskValidation,
  notificationValidation,
  conversationValidation
}
