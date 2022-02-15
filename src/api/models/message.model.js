const mongoose = require('mongoose')

/**
 * Message Schema
 * @private
 */
const MessageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
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
MessageSchema.indexes()
/**
 * typedef log
 */
const Message = mongoose.model('message', MessageSchema)

module.exports = Message
