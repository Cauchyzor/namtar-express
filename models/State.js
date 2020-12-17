const mongoose = require('mongoose');

const stateSchema = mongoose.Schema({
  title: { type: String },
  body: { type: String },
  comments: [{ type: String }],
  gameId: { type: String, required: true }
},
{
  timestamps: true
});

module.exports = mongoose.model('State', stateSchema);
