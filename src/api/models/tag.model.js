const mongoose = require('mongoose')

/**
 * Tag Schema
 * @private
 */
const tagSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      index: true,
      unique: true,
      required: true
    },
    name: {
      type: String,
      unique: true,
      required: true
    },
    color: String
  }
)

/**
 * typedef log
 */
const Tag = mongoose.model('tag', tagSchema)

module.exports = Tag
