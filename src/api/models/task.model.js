const mongoose = require('mongoose')

/**
 * KanbanCardSchema
 * @public
 */
const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    asignees: [{
      type: mongoose.Types.ObjectId,
      ref: 'user'
    }],
    followers: [{
      type: mongoose.Types.ObjectId,
      ref: 'user'
    }],
    dueDate: {
      type: Date
    },
    tags: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'tag'
      }
    ]
  },
  {
    timestamps: true
  }
)

/**
 * typedef kanbanCard
 */
const Task = mongoose.model('task', TaskSchema)

module.exports = Task
