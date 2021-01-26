const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const State = require('../models/State');
const Comment = require('../models/Comment');
const Game = require('../models/Game');
const Character = require('../models/Character');

// TODO: Trouver une requete filtre sur Game et User qui remonte les games et les Characters 

router.get('/selection', function (req, res, next) {
  Game.find()
    .populate('charactersPlaying')
    .then((games) => { res.render('gameSelection', { games: games }); })
    .catch((error) => { res.status(400).json({ error: error }); });
});

router.post('/selection', auth, function (req, res, next) {
  const game = new Game({ name: req.body.gameName });
  game.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    .catch(error => res.status(500).json({ error }));
});

router.get('/engine', auth, function (req, res, next) {
  Character.findById(req.query.characterId)
    .then(character => {
      State.find({ gameId: req.query.gameId })
        .populate('comments')
        .sort('-createdAt')
        .then(states => res.render('gameEngine', { states: states, gameId: req.query.gameId, character: character }))
        .catch(error => res.status(400).json({ error: error }));
    })
    .catch(error => res.status(400).json({ error: error }));
});

router.post('/createState', auth, function (req, res, next) {
  const newStats = new State({ title: req.body.stateTitle, gameId: req.query._id });
  newStats.save()
    .then(() => res.status(201).json({ message: 'State enregistré !' }))
    .catch(error => res.status(500).json({ error }));
});

router.post('/comment/', auth, function (req, res, next) {
  console.log(req.body);
  const newComment = new Comment({ body: req.body.commentBody, characterPosting: req.body.posterId });
  State.updateOne({ _id: req.body.stateId }, { $push: { comments: newComment._id } })
    .then(() => {
      newComment.save()
        .then(() => res.status(201).json({ newComment: newComment.body, message: 'Comment enregistré !' }))
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
});

router.get('/stateEditor', auth, function (req, res, next) {
  State.findOne({ _id: req.query._id })
    .then((state) => { res.render('gameStateEditor', { state: state }); })
    .catch((error) => { res.status(400).json({ error: error }); });
});

router.post('/stateEditor', auth, function (req, res, next) {
  State.updateOne({ _id: req.body.stateId }, { title: req.body.stateTitle, body: req.body.stateContent })
    .then(() => res.redirect('/game/selection'))
    .catch((error) => res.status(400).json({ error: error }));
});

module.exports = router;
