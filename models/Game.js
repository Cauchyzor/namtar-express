const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
  name: { type: String, required: true },
  charactersPlaying: [{ type: mongoose.Types.ObjectId, ref: 'Character' }],
  owner: { type: mongoose.Types.ObjectId, ref: 'User' }
},
{
  timestamps: true
});

module.exports = mongoose.model('Game', gameSchema);
