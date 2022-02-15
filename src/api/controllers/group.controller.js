const httpStatus = require('http-status')

const getApiResponse = require('../utils/response')
const { groupRepo, notificationRepo } = require('../repo')
const { NOT_ACTION } = require('../constants')

const CreateGroup = (req, res, next) => {
  const { id } = req.payload
  const { name, description } = req.body
  try {
    groupRepo.createGroup(id, name, description)
      .then(group => {
        return res.status(httpStatus.OK).json(getApiResponse({ data: group }))
      })
      .catch(() => {
        return res.status(httpStatus.BAD_REQUEST).json(getApiResponse({ msg: 'Error when create new group' }))
      })
  } catch (error) {
    next(error)
  }
}

const GetGroups = async (req, res, next) => {
  const { id } = req.payload
  try {
    const foundGroups = await groupRepo.getGroups(id)
    return res.status(httpStatus.OK).json(getApiResponse({ data: foundGroups }))
  } catch (error) {
    next(error)
  }
}

const AddMember = async (req, res, next) => {
  const { memberId } = req.body
  const { groupId } = req.params
  const { id } = req.payload
  try {
    const updatedGroup = await groupRepo.addMember(groupId, memberId)
    const notData = {
      s: id,
      v: NOT_ACTION.ADD_MEM,
      o: memberId,
      group: groupId
    }
    console.log(notData)
    await notificationRepo.createAddMemberNot(notData)
    return res.status(httpStatus.OK).json(getApiResponse({ data: updatedGroup }))
  } catch (error) {
    next(error)
  }
}

const removeMember = async (req, res, next) => {
  const { memberId } = req.body
  const { groupId } = req.params
  try {
    const updatedGroup = await groupRepo.removeMember(groupId, memberId)
    return res.status(httpStatus.OK).json(getApiResponse({ data: updatedGroup }))
  } catch (error) {
    next(error)
  }
}

const getGroup = async (req, res, next) => {
  const { groupId } = req.params
  try {
    const group = await groupRepo.getGroup(groupId)
    return res.status(httpStatus.OK).json(getApiResponse({ data: group }))
  } catch (error) {
    next(error)
  }
}

const dragProcess = async (req, res, next) => {
  const { groupId } = req.params
  try {
    const group = await groupRepo.dragProcess(groupId, req.body)
    return res.status(httpStatus.OK).json(getApiResponse({ data: group }))
  } catch (error) {
    next(error)
  }
}

module.exports = {
  CreateGroup,
  GetGroups,
  AddMember,
  removeMember,
  getGroup,
  dragProcess
}
