const httpStatus = require('http-status')

const getApiResponse = require('../utils/response')
const { conversationRepo } = require('../repo')

const getConversation = async (req, res, next) => {
  const { conversationId } = req.params
  const { s, e } = req.query
  try {
    const con = await conversationRepo.getConversation(conversationId, s, e)
    return res.status(httpStatus.OK).json(getApiResponse({ data: con }))
  } catch (error) {
    next(error)
  }
}

const addMessage = async (req, res, next) => {
  const { conversationId } = req.params
  try {
    const con = await conversationRepo.addMessage(conversationId, req.body)
    return res.status(httpStatus.OK).json(getApiResponse({ data: con }))
  } catch (error) {
    next(error)
  }
}

module.exports = {
  getConversation,
  addMessage
}
