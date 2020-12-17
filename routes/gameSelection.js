const express = require('express');
const Game = require('../models/Game');
const router = express.Router();

router.get('/', function (req, res, next) {
  Game.find()
    .then((games) => { res.render('gameSelection', { games: games }); })
    .catch((error) => { res.status(400).json({ error: error }); });
});

router.post('/', function (req, res, next) {
  const game = new Game({ name: req.body.gameName });
  game.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    .catch(error => res.status(500).json({ error }));
});

module.exports = router;
