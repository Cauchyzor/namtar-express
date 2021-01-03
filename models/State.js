const mongoose = require('mongoose');

const stateSchema = mongoose.Schema({
  title: { type: String, required: true },
  body: { type: String },
  gameId: { type: String, required: true },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }]
},
{
  timestamps: true
});

module.exports = mongoose.model('State', stateSchema);
