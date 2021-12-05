const { groupRepo } = require('../repo')
const httpStatus = require('http-status')
const getApiResponse = require('../utils/response')

exports.Authorization = async (req, res, next) => {
  const { id: adminId } = req.payload
  const { groupId } = req.params
  try {
    const foundGroup = await groupRepo.getGroupById(groupId)
    if (foundGroup.admin.toString() === adminId) {
      next()
    } else {
      return res.status(httpStatus.UNAUTHORIZED).json(
        getApiResponse({
          ec: 1,
          msg: 'You are not admin'
        })
      )
    }
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).json(
      getApiResponse({
        ec: 1,
        msg: error.message
      })
    )
  }
}
