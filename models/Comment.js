const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
  body: { type: String, required: true },
  characterPostingId: { type: mongoose.Types.ObjectId, ref: 'Character' }
},
{
  timestamps: true
});

module.exports = mongoose.model('Comment', commentSchema);
