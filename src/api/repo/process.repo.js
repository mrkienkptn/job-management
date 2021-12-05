const Process = require('../models/process.model')
const Group = require('../models/group.model')
const AddProcess = async (name, groupId, description) => {
  const newProcess = new Process()
  newProcess.name = name
  newProcess.description = description
  const createdProcess = await newProcess.save()
  const updatedGroup = await Group.findOneAndUpdate(
    { _id: groupId },
    { $addToSet: { processes: createdProcess._id } },
    { new: true }
  )
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

const AddTaskToProcess = async (processId, taskData) => {

}

const RemoveTaskFromProcess = async (processId, taskId) => {

}

module.exports = {
  AddProcess,
  RemoveProcess,
  AddTaskToProcess,
  RemoveTaskFromProcess
}
