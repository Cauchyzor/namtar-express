const express = require('express');
const Character = require('../models/Character');
const Skill = require('../models/Skill');
const router = express.Router();
const aptCharMap = require('../models/AptitudeCharacteristics');
const aptTypeMap = require('../models/AptitudesAttributes');
const aptDescMap = require('../models/AptitudesDescription');

router.get('/selection', function (req, res, next) {
  Character.find()
    .then((characters) => { res.render('characterSelection', { characters: characters }); })
    .catch((error) => { res.status(400).json({ error: error }); });
});

router.get('/skills', function (req, res, next) {
  Skill.find()
    .then((skills) => { res.render('characterSkills', { skills: skills }); })
    .catch((error) => { res.status(400).json({ error: error }); });
});

router.get('/sheet', function (req, res, next) {
  Character.findOne({ _id: req.query._id })
    .populate('compétences')
    .then((character) => {
      const aptitudes = Object.entries(character.aptitudes);
      const characteristics = Object.entries(character.caractéristiques);

      aptitudes.shift();
      characteristics.shift();
      res.render('characterSheet', { character: character, characteristics: characteristics, aptitudes: aptitudes, skills: character.compétences });
    })
    .catch((error) => { res.status(400).json({ error: error }); });
});

router.get('/create', function (req, res, next) {
  Skill.find()
    .then((skills) => {
      const characteristics = [];
      const aptitudes = [];

      Character.schema.eachPath((path) => {
        if (/^caractéristiques.*/.test(path)) {
          return characteristics.push({
            name: path.replace(/^(caractéristiques.)*/, '')
          });
        } else if (/^aptitudes.*/.test(path)) {
          return aptitudes.push({
            name: path.replace(/^(aptitudes.)*/, ''),
            characteristic: aptCharMap.get(path.replace(/^(aptitudes.)*/, '')),
            type: aptTypeMap.get(path.replace(/^(aptitudes.)*/, '')),
            description: aptDescMap.get(path.replace(/^(aptitudes.)*/, ''))
          });
        }
      });
      res.render('characterCreation', { characteristics: characteristics, aptitudes: aptitudes, skills: skills });
    })
    .catch((error) => { res.status(400).json({ error: error }); });
});

router.post('/create', function (req, res, next) {
  console.log(req.body);
  Object.filterAndTransform = (obj, regExp) => {
    const entries = Object.entries(obj)
      .filter(([name, score]) => regExp.test(name))
      .map(([k, v]) => [k.replace(regExp, ''), v]);
    return Object.fromEntries(entries);
  };

  const characteristics = Object.filterAndTransform(req.body, /^char_*/);
  const aptitudes = Object.filterAndTransform(req.body, /^apt_*/);
  const skill = Object.filterAndTransform(req.body, /^skl_*/);

  const character = new Character({
    nom: req.body.pj_name,
    espèce: req.body.pj_species,
    bio: req.body.pj_biography,
    caractéristiques: characteristics,
    aptitudes: aptitudes,
    compétences: Object.keys(skill)
  });

  character.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    .catch(error => res.status(500).json({ error }));
  // res.status(201).json({ message: 'Requête envoyée !' });
});

module.exports = router;
