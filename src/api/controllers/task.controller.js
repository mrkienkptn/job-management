const httpStatus = require('http-status')
const getApiResponse = require('../utils/response')
const { taskRepo, processRepo, groupRepo } = require('../repo')

const addTask = async (req, res, next) => {
  try {
    const { groupId, processId } = req.params
    const createdTask = await taskRepo.createTask(req.body)
    await processRepo.AddTaskToProcess(processId, createdTask._id)
    const updatedGroup = await groupRepo.getGroup(groupId)
    return res.status(httpStatus.OK).json(getApiResponse({ data: updatedGroup }))
  } catch (error) {
    next(error)
  }
}

const getTask = async (req, res, next) => {
  try {
    const { taskId } = req.body
    const task = await taskRepo.getTask(taskId)
    return res.status(httpStatus.OK).json(getApiResponse({ data: task }))
  } catch (error) {
    next(error)
  }
}

module.exports = {
  addTask,
  getTask
}
