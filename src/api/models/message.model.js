const mongoose = require('mongoose')

/**
 * Message Schema
 * @private
 */
const MessageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Types.ObjectId,
      ref: 'user',
      required: true
    },
    content: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)
MessageSchema.indexs()
/**
 * typedef log
 */
const Message = mongoose.model('tag', MessageSchema)

module.exports = Message
