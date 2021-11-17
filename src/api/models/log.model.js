const mongoose = require('mongoose')

/**
 * Log Schema
 * @private
 */
const logSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
      index: true,
      unique: true,
      required: true
    },
    name: {
      type: String,
      unique: true,
      required: true
    },
    description: {
      type: String
    }
  },
  {
    timestamps: true
  }
)

/**
 * typedef log
 */
const Log = mongoose.model('log', logSchema)

module.exports = Log
