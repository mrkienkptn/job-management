const express = require('express')

const userRoutes = require('./user.route')
const groupRoutes = require('./group.route')
const processRoute = require('./process.route')
const router = express.Router()

router.use('/', userRoutes)

router.use('/groups', groupRoutes)

router.use('/process', processRoute)

module.exports = router
