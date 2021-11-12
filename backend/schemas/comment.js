let mongoose = require('mongoose')
let Schema = mongoose.Schema

let commentSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  orderId: String,
  georeferenceId: { type: Schema.Types.ObjectId, ref: 'comment' },
  text: String,
  position: Number
}, {
  collection: 'comments',
  timestamps: true
});

module.exports = commentSchema