const userController = require('./user.controller')
const groupController = require('./group.controller')
const processController = require('./process.controller')
const taskController = require('./task.controller')
const notificationController = require('./notification.controller')
const conversationController = require('./conversation.controller')

module.exports = {
  userController,
  groupController,
  processController,
  taskController,
  notificationController,
  conversationController
}
