const { Process, Group } = require('../models')
const groupRepo = require('./group.repo')
const AddProcess = async (groupId, data) => {
  const newProcess = new Process(data)
  const createdProcess = await newProcess.save()
  const updatedGroup = await Group.findByIdAndUpdate(
    groupId,
    { $addToSet: { processes: createdProcess._id } },
    { new: true }
  )
    .populate({
      path: 'processes',
      select: 'name description isFinish',
      populate: {
        path: 'tasks',
        select: '_id title description'
      }
    })
  return updatedGroup
}
const RemoveProcess = async (groupId, processId) => {
  const updatedProcess = await Group.findOneAndUpdate(
    { _id: groupId },
    { $pull: { processes: processId } },
    { new: true }
  )
  await Process.deleteOne(
    { _id: processId }
  )
  return updatedProcess
}

const AddTaskToProcess = async (processId, taskId) => {
  const updatedProcess = await Process.findByIdAndUpdate(
    processId,
    { $addToSet: { tasks: taskId } }
  )
  return updatedProcess
}

const RemoveTaskFromProcess = async (processId, taskId) => {
  const updatedProcess = await Process.findByIdAndUpdate(
    processId,
    { $pull: { tasks: taskId } }
  )
  return updatedProcess
}

const DragTask = async (groupId, data) => {
  const { cardId, fromColumnId, fromPosition, toColumnId, toPosition } = data
  const updatedFromProcess = await Process.updateOne(
    { _id: fromColumnId },
    { $pull: { tasks: cardId } }
  )
  const updatedToProcess = await Process.updateOne(
    { _id: toColumnId },
    {
      $push: {
        tasks: {
          $each: [cardId],
          $position: toPosition
        }
      }
    }
  )
  const group = await groupRepo.getGroup(groupId)
  return group
}

module.exports = {
  AddProcess,
  RemoveProcess,
  AddTaskToProcess,
  RemoveTaskFromProcess,
  DragTask
}
