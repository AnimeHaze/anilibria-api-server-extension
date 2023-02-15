const { Schema, model } = require('mongoose')

const userSchema = new Schema({
  userId: {
    type: Number,
    required: true,
    index: { unique: true }
  },
  username: {
    type: String,
    required: true,
    index: { unique: true }
  }
}, {
  autoIndex: true,
  timestamps: { createdAt: true, updatedAt: true },
  autoCreate: true
})

module.exports = { userModel: model('user', userSchema) }
