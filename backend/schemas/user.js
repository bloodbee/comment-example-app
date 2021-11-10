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

// byEmail query builder
userSchema.query.byEmail = function(email) {
  return this.where({ email: new RegExp(email, 'i') })
};

module.exports = userSchema