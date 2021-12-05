const mongoose = require('mongoose')

const ProcessSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'task'
    }
  ],
  description: {
    type: String
  },
  isFinish: {
    type: Boolean,
    default: false
  }
})

ProcessSchema.indexes()

const Process = mongoose.model('process', ProcessSchema)

module.exports = Process
