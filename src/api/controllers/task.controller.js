const httpStatus = require('http-status')
const getApiResponse = require('../utils/response')
const { taskRepo, processRepo, groupRepo } = require('../repo')

const addTask = async (req, res, next) => {
  try {
    const { groupId, processId } = req.params
    const createdTask = await taskRepo.createTask(req.body)
    await processRepo.AddTaskToProcess(processId, createdTask._id)
    const updatedGroup = await groupRepo.getGroup(groupId)
    return res.status(httpStatus.OK).json(getApiResponse({ data: { updatedGroup, createdTask } }))
  } catch (error) {
    next(error)
  }
}

const getTask = async (req, res, next) => {
  try {
    const { taskId } = req.params
    const task = await taskRepo.getTask(taskId)
    return res.status(httpStatus.OK).json(getApiResponse({ data: task }))
  } catch (error) {
    next(error)
  }
}

const updateTask = async (req, res, next) => {
  try {
    const { taskId } = req.params
    const task = await taskRepo.updateTask(taskId, req.body)
    return res.status(httpStatus.OK).json(getApiResponse({ data: task }))
  } catch (error) {
    next(error)
  }
}

const addAssignee = async (req, res, next) => {
  const { taskId } = req.params
  const { userId: assigneeId } = req.body
  try {
    const task = await taskRepo.addAssignee(taskId, assigneeId)
    return res.status(httpStatus.OK).json(getApiResponse({ data: task }))
  } catch (error) {
    next(error)
  }
}

const removeAssignee = async (req, res, next) => {
  const { taskId } = req.params
  const { userId: assigneeId } = req.body
  try {
    const task = await taskRepo.removeAssignee(taskId, assigneeId)
    return res.status(httpStatus.OK).json(getApiResponse({ data: task }))
  } catch (error) {
    next(error)
  }
}

const addFollower = async (req, res, next) => {
  const { taskId } = req.params
  const { userId: assigneeId } = req.body
  try {
    const task = await taskRepo.addFollower(taskId, assigneeId)
    return res.status(httpStatus.OK).json(getApiResponse({ data: task }))
  } catch (error) {
    next(error)
  }
}

const removeFollower = async (req, res, next) => {
  const { taskId } = req.params
  const { userId: assigneeId } = req.body
  try {
    const task = await taskRepo.removeFollower(taskId, assigneeId)
    return res.status(httpStatus.OK).json(getApiResponse({ data: task }))
  } catch (error) {
    next(error)
  }
}

const deleteTask = async (req, res, next) => {
  const { processId, taskId } = req.params
  try {
    const rs = await taskRepo.deleteTask(processId, taskId)
    return res.status(httpStatus.OK).json(getApiResponse({ data: rs }))
  } catch (error) {
    next(error)
  }
}

module.exports = {
  addTask,
  getTask,
  updateTask,
  addAssignee,
  removeAssignee,
  addFollower,
  removeFollower,
  deleteTask
}
