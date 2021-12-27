const mongoose = require('mongoose')

const NotificationSchema = new mongoose.Schema({
  actorS: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    require: true
  },
  action: {
    type: String,
    require: true
  },
  actorP: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    require: true
  }
})

NotificationSchema.indexes()

const Notification = mongoose.Model('notification', NotificationSchema)

module.exports = Notification