const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const skillSchema = mongoose.Schema({
  nom: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  type: { type: String, required: true }
});

skillSchema.plugin(uniqueValidator);

module.exports = mongoose.model('Skill', skillSchema);
