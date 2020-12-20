const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  body: { type: String, required: true },
  stateId: { type: mongoose.Schema.Types.ObjectId, required: true }
},
{
  timestamps: true
});

module.exports = mongoose.model('Comment', commentSchema);
