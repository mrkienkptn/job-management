const Group = require('../models/group.model')

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
module.exports = {
  createGroup,
  getGroupById,
  getGroups,
  addMember,
  removeMember,
  closeGroup
}
