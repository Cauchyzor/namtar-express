const express = require('express');
const router = express.Router();
const State = require('../models/State');
const Comment = require('../models/Comment');

router.get('/', function (req, res, next) {
  console.log();
  State.find({ gameId: req.query._id })
    .populate('comments')
    .sort('-createdAt')
    .then((states) => { res.render('game', { states: states, gameId: req.query._id }); })
    .catch((error) => { res.status(400).json({ error: error }); });
});

router.post('/', function (req, res, next) {
  const newComment = new Comment({ body: req.body.commentBody });
  State.updateOne({ _id: req.body.stateId }, { $push: { comments: newComment._id } }, function (res, err) {
    // if (res !== null) console.log(res);
    // if (err !== null) console.log(err);
  });

  newComment.save()
    .then(() => res.status(201).json({ newComment: newComment.body, message: 'Comment enregistré !' }))
    .catch(error => res.status(500).json({ error }));
});

module.exports = router;
