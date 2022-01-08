const httpStatus = require('http-status')

const getApiResponse = require('../utils/response')
const { notificationRepo } = require('../repo')

const getONotification = async (req, res, next) => {
  const { id } = req.payload
  try {
    const rs = await notificationRepo.getONotifications(id, req.query)
    return res.status(httpStatus.OK).json(getApiResponse({ data: rs }))
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getONotification
}
