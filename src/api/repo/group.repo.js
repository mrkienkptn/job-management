const { Group } = require('../models')
const { createConversation } = require('./conversation.repo')
const createGroup = async (adminId, name, description) => {
  const group = new Group()
  group.admin = adminId
  group.name = name
  group.description = description
  const converst = await createConversation(name)
  group.conversation = converst._id
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

const addMember = async (groupId, memberId) => {
  await Group.updateOne(
    { _id: groupId },
    { $addToSet: { members: memberId } },
    { new: true }
  )
  const group = await getGroup(groupId)
  return group
}
const removeMember = async (groupId, memberId) => {
  await Group.updateOne(
    { _id: groupId },
    { $pull: { members: memberId } },
    { new: true }
  )
  const group = await getGroup(groupId)
  return group
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
        select: '_id title description dueDate',
        populate: [
          {
            path: 'assignees',
            select: '_id name email'
          },
          {
            path: 'followers',
            select: '_id name email'
          }
        ]
      }
    })
    .populate({
      path: 'members',
      select: 'name _id email'
    })
  return group
}

const dragProcess = async (groupId, data) => {
  const { processId, toPosition } = data
  await Group.updateOne(
    { _id: groupId },
    {
      $pull: { processes: processId }
    }
  )
  await Group.updateOne(
    { _id: groupId },
    {
      $push: { processes: { $each: [processId], $position: toPosition } }
    }
  )
  return await getGroup(groupId)
}

module.exports = {
  createGroup,
  getGroupById,
  getGroups,
  addMember,
  removeMember,
  closeGroup,
  getGroup,
  dragProcess
}
