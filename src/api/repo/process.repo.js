const { Process, Group, Task } = require('../models')
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
    .populate({
      path: 'members',
      select: 'name _id email'
    })
  return {
    createdProcess,
    updatedGroup
  }
}
const RemoveProcess = async (groupId, processId) => {
  const updateGroup = Group.findByIdAndUpdate(
    groupId,
    { $pull: { processes: processId } },
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
    .populate({
      path: 'members',
      select: 'name _id email'
    })
  const removeProcess = Process.findByIdAndRemove(processId)
  const [group, removedProcess] = await Promise.all([
    updateGroup,
    removeProcess
  ])
  const { tasks } = removedProcess
  const deleteTasks = []
  for (let i = 0; i < tasks.length; i++) {
    const del = Task.deleteOne({ _id: tasks[i]._id })
    deleteTasks.push(del)
  }
  await Promise.all(deleteTasks)
  return {
    group,
    removedProcess
  }
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
  const { cardId, fromColumnId, toColumnId, toPosition } = data
  await Process.updateOne(
    { _id: fromColumnId },
    { $pull: { tasks: cardId } }
  )
  await Process.updateOne(
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

const editProcess = async (groupId, processId, data) => {
  const updateProcess = Process.findByIdAndUpdate(
    processId,
    data,
    { new: true }
  )
  const getGroup = groupRepo.getGroup(groupId)
  const [updatedProcess, group] = await Promise.all([
    updateProcess,
    getGroup
  ])
  return {
    updatedProcess,
    group
  }
}

module.exports = {
  AddProcess,
  RemoveProcess,
  AddTaskToProcess,
  RemoveTaskFromProcess,
  DragTask,
  editProcess
}
