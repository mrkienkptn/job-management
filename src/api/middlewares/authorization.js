const httpStatus = require('http-status')
const mongoose = require('mongoose')

const { groupRepo } = require('../repo')
const getApiResponse = require('../utils/response')

const { ObjectId } = mongoose.Types

exports.adminAuth = async (req, res, next) => {
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

exports.memberAuth = async (req, res, next) => {
  const { id: userId } = req.payload
  const { groupId } = req.params
  try {
    const foundGroup = await groupRepo.getGroupById(groupId)
    const members = foundGroup.members
    if (members.includes(ObjectId(userId)) || foundGroup.admin.toString() === userId) {
      next()
    } else {
      return res.status(httpStatus.UNAUTHORIZED).json(
        getApiResponse({
          ec: 1,
          msg: 'You are not a member of this group'
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
