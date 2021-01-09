const express = require('express');
const router = express.Router();
const State = require('../models/State');

router.get('/', function (req, res, next) {
  console.log(req.query);
  State.findOne({ _id: req.query._id })
    .then((state) => { res.render('gameStateEditor', { state: state }); })
    .catch((error) => { res.status(400).json({ error: error }); });
});

router.post('/', function (req, res, next) {
  console.log(req.body);
  State.updateOne({ _id: req.body.stateId }, { body: req.body.stateContent }, function (res, err) {
    // if (res !== null) console.log(res);
    // if (err !== null) console.log(err);
  });
  res.redirect('gameSelection');
});

module.exports = router;
