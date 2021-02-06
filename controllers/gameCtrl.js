const Game = require('../models/Game');
const State = require('../models/State');
const Character = require('../models/Character');
const Comment = require('../models/Comment');

exports.findAllGames = (req, res, next) => {
  Game.find()
    .populate('charactersPlaying')
    .then(games => res.render('gameSelection', { games: games }))
    .catch(error => res.status(400).json({ error }));
};

exports.populateGameStates = (req, res, next) => {
  let states;
  let game;
  State.find({ gameId: req.query.gameId })
    .populate('comments')
    .sort('-createdAt')
    .then(premiseStates => { states = premiseStates; return Game.findById(req.query.gameId).populate('charactersPlaying'); })
    .then(premiseGame => { game = premiseGame; return Character.findById(req.query.characterId); })
    .then(premiseCharacter => res.render('gameEngine', { states: states, game: game, characterPlaying: premiseCharacter }))
    .catch(error => res.status(400).json({ error }));
};

exports.postComment = (req, res, next) => {
  const newComment = new Comment({ body: req.body.commentBody, characterPostingId: req.body.posterId });
  newComment.save()
    .then(() => State.updateOne({ _id: req.body.stateId }, { $push: { comments: newComment._id } }))
    .then(() => res.status(201).json({ newComment: newComment.body, message: 'Comment enregistré !' }))
    .catch(error => res.status(500).json({ error }));
};

exports.findAllGamesOwner = (req, res, next) => {
  Game.find({ owner: req.userId })
    .populate('charactersPlaying')
    .then(games => res.render('gameOwnerSelection', { games: games }))
    .catch(error => res.status(400).json({ error }));
};

exports.createGame = (req, res, next) => {
  const game = new Game({ name: req.body.gameName, owner: req.userId });
  game.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    .catch(error => res.status(500).json({ error }));
};

exports.populateGameStatesOwner = (req, res, next) => {
  let states;
  State.find({ gameId: req.query.gameId })
    .populate('comments')
    .sort('-createdAt')
    .then(premiseStates => { states = premiseStates; return Game.findById(req.query.gameId).populate('charactersPlaying'); })
    .then(premiseGame => res.render('gameOwnerEngine', { states: states, game: premiseGame }))
    .catch(error => console.log(error));
};

exports.createState = (req, res, next) => {
  const newStats = new State({ title: req.body.stateTitle, gameId: req.query._id });
  newStats.save()
    .then(() => res.status(201).json({ message: 'State enregistré !' }))
    .catch(error => res.status(500).json({ error }));
};

exports.getOneState = (req, res, next) => {
  let state;
  State.findOne({ _id: req.query._id })
    .then(statePremise => { state = statePremise; Game.exists({ owner: req.userId }); })
    .then(() => res.render('gameStateEditor', { state: state }))
    .catch(error => res.status(400).json({ error }));
};

exports.editState = (req, res, next) => {
  State.updateOne({ _id: req.body.stateId }, { title: req.body.stateTitle, body: req.body.stateContent })
    .then(() => res.redirect('/game/owner/selection'))
    .catch(error => res.status(400).json({ error }));
};
