const mongoose = require('mongoose')

const CheckListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  items: [
    {
      name: String,
      value: Boolean
    }
  ]
})

CheckListSchema.indexes()

const CheckList = mongoose.model('check-list', CheckListSchema)

module.exports = CheckList
