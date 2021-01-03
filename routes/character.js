const express = require('express');
const Character = require('../models/Character');
const router = express.Router();

router.get('/', function (req, res, next) {
  Character.findOne({ _id: req.query._id })
    .then((character) => {
      const aptitudes = Object.entries(character.aptitudes);
      const characteristics = Object.entries(character.caractéristiques);
      const skills = Object.entries(character.compétences);

      aptitudes.shift();
      characteristics.shift();

      res.render('character', { character: character, characteristics: characteristics, aptitudes: aptitudes, skills: skills });
    })
    .catch((error) => { res.status(400).json({ error: error }); });
});

module.exports = router;
