const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const compress = require('compression')
const methodOverride = require('method-override')
const cors = require('cors')
const helmet = require('helmet')
const timeout = require('connect-timeout')

const { logs, authConfig } = require('./vars')
const routes = require('../api/routes/v1')
const error = require('../api/middlewares/error')

const haltOnTimedout = (req, _res, next) => {
  if (!req.timedout) next()
}

/**
 * Express instance
 * @public
 */
const app = express()

// app.use(express.static('docs'));

app.use(timeout('5s'))

// request logging. dev: console | production: file
app.use(morgan(logs))

// parse body params and attache them to req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// gzip compression
app.use(compress())

// lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it
app.use(methodOverride())

// secure apps by setting various HTTP headers
app.use(helmet())

// enable CORS - Cross Origin Resource Sharing
app.use(cors())

/**
 * GET /health
 */
app.use('/health', (_req, res) => res.send('OK'))

// config auth
app.use((req, _res, next) => {
  req.authConfig = authConfig
  next()
})

// mount api v1 routes
app.use('/', routes)

// if error is not an instanceOf APIError, convert it.
app.use(error.converter)

// catch 404 and forward to error handler
app.use(error.notFound)

app.use(haltOnTimedout)

// error handler, send stacktrace only during development
app.use(error.handler)

module.exports = app
