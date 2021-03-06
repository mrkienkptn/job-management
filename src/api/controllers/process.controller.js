const { processRepo } = require('../repo')
const httpStatus = require('http-status')
const getApiResponse = require('../utils/response')

const AddProcess = async (req, res, next) => {
  try {
    const { groupId } = req.params
    const createdProcess = await processRepo.AddProcess( groupId, req.body)
    return res.status(httpStatus.OK).json(getApiResponse({ data: createdProcess }))
  } catch (error) {
    next(error)
  }
}

const RemoveProcess = async (req, res, next) => {
  const { groupId, processId } = req.params
  try {
    const result = await processRepo.RemoveProcess(groupId, processId)
    return res.status(httpStatus.OK).json(getApiResponse({ data: result }))
  } catch (error) {
    next(error)
  }
}

const DragTask = async (req, res, next) => {
  const { groupId } = req.params
  try {
    const updatedGroup = await processRepo.DragTask(groupId, req.body)
    return res.status(httpStatus.OK).json(getApiResponse({ data: updatedGroup }))
  } catch (error) {
    next(error)
  }
}

const EditProcess = async (req, res, next) => {
  const { processId, groupId } = req.params
  try {
    const data = await processRepo.editProcess(groupId, processId, req.body)
    return res.status(httpStatus.OK).json(getApiResponse({ data }))
  } catch (error) {
    next(error)
  }
}

module.exports = {
  AddProcess,
  RemoveProcess,
  DragTask,
  EditProcess
}
