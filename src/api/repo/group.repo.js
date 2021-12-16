const { Group } = require('../models')

const createGroup = (adminId, name, description) => {
  const group = new Group()
  group.admin = adminId
  group.name = name
  group.description = description

  return group.save()
}

const getGroupById = (groupId) => {
  return Group.findById(groupId)
}

const getGroups = (userId) => {
  const groups = Group.find({
    $or: [
      {
        members: {
          $all: [userId]
        }
      },
      {
        admin: userId
      }
    ]
  })
    .populate('admin')
    .populate('processes')
    .sort({ createdAt: 1 })
  return groups
}

const addMember = (groupId, memberId) => {
  const update = Group.updateOne(
    { _id: groupId },
    { $addToSet: { members: memberId } },
    { new: true }
  )
  return update
}
const removeMember = async (groupId, memberId) => {
  const update = await Group.updateOne(
    { _id: groupId },
    { $pull: { members: memberId } },
    { new: true }
  )
  return update
}

const closeGroup = async (groupId) => {
  const deleteGroup = await Group.deleteOne({ _id: groupId })
  return deleteGroup
}

const getGroup = async (groupId) => {
  const group = await Group.findById(groupId)
    .populate({
      path: 'processes',
      select: 'name description isFinish',
      populate: {
        path: 'tasks',
        select: '_id title description'
      }
    })
    return group
}
module.exports = {
  createGroup,
  getGroupById,
  getGroups,
  addMember,
  removeMember,
  closeGroup,
  getGroup
}
