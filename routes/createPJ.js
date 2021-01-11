const express = require('express');
const Character = require('../models/Character');
const router = express.Router();
const aptCharMap = require('../models/AptitudeCharacteristics');
const aptTypeMap = require('../models/AptitudesAttributes');
const aptDescMap = require('../models/AptitudesDescription');

router.get('/', function (req, res, next) {
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

  res.render('createPJ', { characteristics: characteristics, aptitudes: aptitudes });
});

router.post('/', function (req, res, next) {
  console.log(req.body);
  Object.filterAndTransform = (obj, regExp) => {
    const entries = Object.entries(obj)
      .filter(([name, score]) => regExp.test(name))
      .map(([k, v]) => [k.replace(regExp, ''), v]);
    return Object.fromEntries(entries);
  };

  const characteristics = Object.filterAndTransform(req.body, /^char_*/);
  const aptitudes = Object.filterAndTransform(req.body, /^apt_*/);

  const character = new Character({
    nom: req.body.pj_name,
    espèce: req.body.pj_species,
    bio: req.body.pj_biography,
    caractéristiques: characteristics,
    aptitudes: aptitudes,
    compétences: []
  });

  character.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    .catch(error => res.status(500).json({ error }));
  // res.status(201).json({ message: 'Requête envoyée !' });
});

module.exports = router;
