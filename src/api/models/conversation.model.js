const mongoose = require('mongoose')

const ConversationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  messages: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'message'
    }
  ]
})

ConversationSchema.indexes()

const Conversation = mongoose.model('conversation', ConversationSchema)

module.exports = Conversation
