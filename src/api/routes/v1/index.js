const express = require('express')

const logRoutes = require('./log.route')

const router = express.Router()

/**
 * GET v1/docs
 */
router.use('/docs', express.static('docs'))

router.use('/', logRoutes)

module.exports = router
