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
    .then(games => res.render('gameSelection', { games: games }))
    .catch(error => res.status(400).json({ error }));
});

router.post('/selection', auth, function (req, res, next) {
  const game = new Game({ name: req.body.gameName });
  game.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    .catch(error => res.status(500).json({ error }));
});

router.get('/engine', auth, function (req, res, next) {
  let states;
  let game;
  State.find({ gameId: req.query.gameId })
    .populate('comments')
    .sort('-createdAt')
    .then(premiseStates => { states = premiseStates; return Game.findById(req.query.gameId).populate('charactersPlaying'); })
    .then(premiseGame => { game = premiseGame; return Character.findById(req.query.characterId); })
    .then(premiseCharacter => res.render('gameEngine', { states: states, game: game, characterPlaying: premiseCharacter }))
    .catch(error => res.status(400).json({ error }));
});

router.post('/createState', auth, function (req, res, next) {
  const newStats = new State({ title: req.body.stateTitle, gameId: req.query._id });
  newStats.save()
    .then(() => res.status(201).json({ message: 'State enregistré !' }))
    .catch(error => res.status(500).json({ error }));
});

router.post('/comment/', function (req, res, next) {
  const newComment = new Comment({ body: req.body.commentBody, characterPostingId: req.body.posterId });
  newComment.save()
    .then(() => State.updateOne({ _id: req.body.stateId }, { $push: { comments: newComment._id } }))
    .then(() => res.status(201).json({ newComment: newComment.body, message: 'Comment enregistré !' }))
    .catch(error => res.status(500).json({ error }));
});

router.get('/stateEditor', auth, function (req, res, next) {
  State.findOne({ _id: req.query._id })
    .then(state => res.render('gameStateEditor', { state: state }))
    .catch(error => res.status(400).json({ error }));
});

router.post('/stateEditor', auth, function (req, res, next) {
  State.updateOne({ _id: req.body.stateId }, { title: req.body.stateTitle, body: req.body.stateContent })
    .then(() => res.redirect('/game/selection'))
    .catch(error => res.status(400).json({ error }));
});

module.exports = router;
