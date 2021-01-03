const mongoose = require('mongoose');

const characterSchema = mongoose.Schema({
  nom: { type: String, required: true },
  espèce: { type: String, required: true },
  bio: { type: String },
  caractéristiques: {
    Vigueur: { type: Number, default: 2, min: 1, max: 6 },
    Agilité: { type: Number, default: 2, min: 1, max: 6 },
    Intelligence: { type: Number, default: 2, min: 1, max: 6 },
    Ruse: { type: Number, default: 2, min: 1, max: 6 },
    Volonté: { type: Number, default: 2, min: 1, max: 6 },
    Présence: { type: Number, default: 2, min: 1, max: 6 }
  },
  aptitudes: {
    Athletisme: { type: Number, default: 0, min: 0, max: 5 },
    Pugilat: { type: Number, default: 0, min: 0, max: 5 },
    Charme: { type: Number, default: 0, min: 0, max: 5 },
    Coercion: { type: Number, default: 0, min: 0, max: 5 },
    Informatique: { type: Number, default: 0, min: 0, max: 5 },
    Calme: { type: Number, default: 0, min: 0, max: 5 },
    Coordination: { type: Number, default: 0, min: 0, max: 5 },
    Tromperie: { type: Number, default: 0, min: 0, max: 5 },
    'Sang-froid': { type: Number, default: 0, min: 0, max: 5 },
    Artillerie: { type: Number, default: 0, min: 0, max: 5 },
    Mécanique: { type: Number, default: 0, min: 0, max: 5 },
    Medecine: { type: Number, default: 0, min: 0, max: 5 },
    Negociation: { type: Number, default: 0, min: 0, max: 5 },
    'Corps  à corps': { type: Number, default: 0, min: 0, max: 5 },
    Commandement: { type: Number, default: 0, min: 0, max: 5 },
    Perception: { type: Number, default: 0, min: 0, max: 5 },
    Pilotage: { type: Number, default: 0, min: 0, max: 5 },
    'Distance - Légère': { type: Number, default: 0, min: 0, max: 5 },
    'Distance - Lourde': { type: Number, default: 0, min: 0, max: 5 },
    Résistance: { type: Number, default: 0, min: 0, max: 5 },
    Résonance: { type: Number, default: 0, min: 0, max: 5 },
    Magouille: { type: Number, default: 0, min: 0, max: 5 },
    Discrétion: { type: Number, default: 0, min: 0, max: 5 },
    Survie: { type: Number, default: 0, min: 0, max: 5 },
    Vigilance: { type: Number, default: 0, min: 0, max: 5 }
  },
  compétences: [{ type: mongoose.Types.ObjectId }]
},
{
  timestamps: true
});

module.exports = mongoose.model('Character', characterSchema);
