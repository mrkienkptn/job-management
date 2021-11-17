const httpStatus = require('http-status')

const { logRepo } = require('../repo')
const getApiResponse = require('../utils/response')

const getLog = async (req, res, next) => {
  const { logId } = req.params
  try {
    const log = await logRepo.getGroup(logId)
    return res.status(httpStatus.OK).json(getApiResponse({ data: log }))
  } catch (error) {
    next(error)
  }
}

const getLogs = async (req, res, next) => {
  try {
    const { data, total } = await logRepo.getLogs(req.query)
    return res.status(httpStatus.OK).json(getApiResponse({ data, total }))
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getLog,
  getLogs
}
