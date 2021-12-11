const Process = require('../models/process.model')
const Group = require('../models/group.model')
const AddProcess = async ( groupId, data) => {
  const newProcess = new Process(data)
  const createdProcess = await newProcess.save()
  const updatedGroup = await Group.findByIdAndUpdate(
    groupId,
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
