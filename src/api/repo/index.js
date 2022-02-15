const userRepo = require('./user.repo')
const groupRepo = require('./group.repo')
const processRepo = require('./process.repo')
const taskRepo = require('./task.repo')
const notificationRepo = require('./notification.repo')
const conversationRepo = require('./conversation.repo')

module.exports = {
  userRepo,
  groupRepo,
  processRepo,
  taskRepo,
  notificationRepo,
  conversationRepo
}
