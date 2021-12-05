const httpStatus = require('http-status')
const getApiResponse = require('../utils/response')
const { groupRepo } = require('../repo')

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
  const { id: adminId } = req.payload
  const { memberId } = req.body
  const { groupId } = req.params
  try {
    const foundGroup = await groupRepo.getGroupById(groupId)
    if (foundGroup.admin.toString() === adminId) {
      const updatedGroup = await groupRepo.addMember(groupId, memberId)
      return res.status(httpStatus.OK).json(getApiResponse({ data: updatedGroup }))
    } else {
      return res.status(httpStatus.BAD_REQUEST).json(getApiResponse({ msg: 'You are not admin' }))
    }
  } catch (error) {
    next(error)
  }
}

module.exports = {
  CreateGroup,
  GetGroups,
  AddMember
}
