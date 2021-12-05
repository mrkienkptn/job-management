const express = require('express')

const userRoutes = require('./user.route')
const groupRoutes = require('./group.route')
const processRoute = require('./process.route')
const router = express.Router()

/**
 * GET v1/docs
 */
router.use('/docs', express.static('docs'))

// router.use('/', logRoutes)

router.use('/', userRoutes)

router.use('/groups', groupRoutes)

router.use('/processes', processRoute)

module.exports = router
