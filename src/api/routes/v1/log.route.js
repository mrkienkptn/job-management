const { Router } = require('express')

const { logController: controller } = require('../../controllers')
const { logValidation: validation } = require('../../validations')
const { verifyToken } = require('../../middlewares')

const router = Router()

router
  /**
   * @api {get} /cdns List logs
   * @apiDescription Get a list of logs
   * @apiVersion 1.0.0
   * @apiName ListLog
   * @apiGroup Log
   * @apiPermission admin, merchant
   *
   * @apiHeader {String} Authorization User's access token
   *
   * @apiSuccess {Number} ec  Error code
   * @apiSuccess {String} msg  Response message
   * @apiSuccess {Number} total Total records
   * @apiSuccess {String} data List logs
   *
   * @apiError (Unauthorized 401) Unauthorized Only authenticated users can access the data
   * @apiError (Forbidden 403)    Forbidden    Only user with same id or admins can access the data
   */
  .route('/')
  .get(verifyToken, validation.getLogsValidate, controller.getLogs)

router
  .route('/:logId')
  .get(verifyToken, validation.getLogValidate, controller.getLog)

module.exports = router
