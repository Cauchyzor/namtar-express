const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  body: { type: String, required: true },
},
{
  timestamps: true
});

module.exports = mongoose.model('Comment', commentSchema);
