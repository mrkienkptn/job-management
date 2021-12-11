const { processRepo } = require('../repo')
const httpStatus = require('http-status')
const getApiResponse = require('../utils/response')

const AddProcess = async (req, res) => {
  try {
    const { groupId } = req.params
    const createdProcess = await processRepo.AddProcess( groupId, req.body)
    return res.status(httpStatus.OK).json(getApiResponse({ data: createdProcess }))
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json(getApiResponse({ data: error }))
  }
}

const RemoveProcess = async (req, res) => {
  const { groupId, processId } = req.params
  try {
    const updatedProcess = await processRepo.RemoveProcess(groupId, processId)
    return res.status(httpStatus.OK).json(getApiResponse({ data: updatedProcess }))
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).json(getApiResponse({ data: error }))
  }
}

module.exports = {
  AddProcess,
  RemoveProcess
}
