const express = require('express')

const userRoutes = require('./user.route')
const groupRoutes = require('./group.route')
const processRoutes = require('./process.route')
const taskRoutes = require('./task.route')
const notificationRoutes = require('./notification.route')
const conversationRoutes = require('./conversation.route')

const router = express.Router()

router.use('/', userRoutes)

router.use('/groups', groupRoutes)

router.use('/process', processRoutes)

router.use('/tasks', taskRoutes)

router.use('/notifications', notificationRoutes)

router.use('/conversations', conversationRoutes)

module.exports = router
