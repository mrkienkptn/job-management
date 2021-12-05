const mongoose = require('mongoose')

const GroupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    }
  ],
  description: {
    type: String,
    default: ''
  },
  processes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'process'
    }
  ],
  conversation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'conversation'
  }
})

GroupSchema.indexes()

const Group = mongoose.model('group', GroupSchema)

module.exports = Group
