const mongoose = require('mongoose')

/**
 * User Schema
 * @private
 */
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      index: true,
      unique: true,
      required: true,
      sparse: true
    },
    password: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
)
userSchema.indexes()
/**
 * typedef user
 */
const User = mongoose.model('user', userSchema)

module.exports = User
