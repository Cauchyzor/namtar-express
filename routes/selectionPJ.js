const express = require('express');
const Character = require('../models/Character');
const router = express.Router();

router.get('/', function (req, res, next) {
  Character.find()
    .then((characters) => { res.render('selectionPJ', { characters: characters }); })
    .catch((error) => { res.status(400).json({ error: error }); });
});

module.exports = router;
