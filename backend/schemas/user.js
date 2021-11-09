let mongoose = require('mongoose')
let Schema = mongoose.Schema

let userSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  hashedPassword: {
    type: String,
    required: true
  },
  role: { type: String, default: 'basic' },
  comments: [{ type: Schema.Types.ObjectId, ref: 'comment' }],
}, {
  collection: 'users',
  timestamps: true
});

module.exports = userSchema