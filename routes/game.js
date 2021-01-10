const express = require('express');
const router = express.Router();
const State = require('../models/State');
const Comment = require('../models/Comment');
const Game = require('../models/Game');

router.get('/selection', function (req, res, next) {
  Game.find()
    .then((games) => { res.render('gameSelection', { games: games }); })
    .catch((error) => { res.status(400).json({ error: error }); });
});

router.post('/selection', function (req, res, next) {
  const game = new Game({ name: req.body.gameName });
  game.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    .catch(error => res.status(500).json({ error }));
});

router.get('/engine', function (req, res, next) {
  State.find({ gameId: req.query._id })
    .populate('comments')
    .sort('-createdAt')
    .then((states) => { res.render('gameEngine', { states: states, gameId: req.query._id }); })
    .catch((error) => { res.status(400).json({ error: error }); });
});

router.post('/createState', function (req, res, next) {
  const newStats = new State({ title: req.body.stateTitle, gameId: req.query._id });
  newStats.save()
    .then(() => res.status(201).json({ message: 'State enregistré !' }))
    .catch(error => res.status(500).json({ error }));
});

router.post('/comment/', function (req, res, next) {
  const newComment = new Comment({ body: req.body.commentBody });
  State.updateOne({ _id: req.body.stateId }, { $push: { comments: newComment._id } }, function (res, err) {
    // if (res !== null) console.log(res);
    // if (err !== null) console.log(err);
  });

  newComment.save()
    .then(() => res.status(201).json({ newComment: newComment.body, message: 'Comment enregistré !' }))
    .catch(error => res.status(500).json({ error }));
});

router.get('/stateEditor', function (req, res, next) {
  console.log(req.query);
  State.findOne({ _id: req.query._id })
    .then((state) => { res.render('gameStateEditor', { state: state }); })
    .catch((error) => { res.status(400).json({ error: error }); });
});

router.post('/stateEditor', function (req, res, next) {
  console.log(req.body);
  State.updateOne({ _id: req.body.stateId }, { title: req.body.stateTitle, body: req.body.stateContent }, function (res, err) {
    // if (res !== null) console.log(res);
    // if (err !== null) console.log(err);
  });
  res.redirect('/game/selection');
});


module.exports = router;
