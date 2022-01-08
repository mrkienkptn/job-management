const mongoose = require('mongoose')

const NotificationSchema = new mongoose.Schema({
  s: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    require: true
  },
  v: {
    type: String,
    require: true
  },
  o: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    require: true
  },
  group: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'group'
  },
  isRead: {
    type: Boolean,
    default: false
  }
})

NotificationSchema.indexes()

const Notification = mongoose.model('notification', NotificationSchema)

module.exports = Notification