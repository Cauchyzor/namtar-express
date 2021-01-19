const mongoose = require('mongoose');

const gameSchema = mongoose.Schema({
  name: { type: String, required: true },
  charactersPlaying: [{ type: mongoose.Types.ObjectId, ref: 'Character' }]
},
{
  timestamps: true
});

module.exports = mongoose.model('Game', gameSchema);
