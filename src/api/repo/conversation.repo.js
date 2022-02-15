const { Conversation, Message } = require('../models')

const createConversation = (name) => {
  const newConversation = new Conversation({ name })
  return newConversation.save()
}

const getConversation = async (id, s, e) => {
  const con = await Conversation.findById(
    id,
    {
      messages: { $slice: [s, e] }
    }
  ).populate({
    path: 'messages',
    select: '_id content createdAt',
    populate: {
      path: 'senderId',
      select: '_id name'
    }
  })
  return con
}

const addMessage = async (id, data) => {
  const createdMes = await Message.create(data)
  const updatedCon = await Conversation.updateOne(
    { _id: id },
    { $push: { messages: { $each: [createdMes._id], $position: 0 } } }
  )
  return { createdMes, updatedCon }
}

module.exports = {
  createConversation,
  getConversation,
  addMessage
}
