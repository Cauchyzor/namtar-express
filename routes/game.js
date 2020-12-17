const express = require('express');
const router = express.Router();
const State = require('../models/State');

router.get('/', function (req, res, next) {
  console.log();
  State.find({ gameId: req.query._id })
    .sort('-createdAt')
    .then((states) => { res.render('game', { states: states, gameId: req.query._id }); })
    .catch((error) => { res.status(400).json({ error: error }); });
});

router.post('/', function (req, res, next) {
  console.log(req.query._id);
  const state = new State({ gameId: req.query._id, title: 'Nouveau Status' });
  state.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    .catch(error => res.status(500).json({ error }));
});

module.exports = router;
