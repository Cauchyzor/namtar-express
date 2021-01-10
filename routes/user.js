const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

router.get('/', function (req, res) {
  res.render('login');
});

router.post('/login', function (req, res, next) {
  User.findOne({ pseudo: req.body.pseudo })
    .then(user => {
      if (!user) {
        return res.status(404).json({ error: 'utilisateur introuvable !' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Mot de passe incorrect!' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign({ userId: user._id }, 'RANDOM_SECRET', { expiresIn: '24h' })
          });
        });
    })
    .catch(error => res.status(500).json({ error }));
});

/* GET users listing. */
router.post('/signup', function (req, res, next) {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        pseudo: req.body.pseudo,
        password: hash
      });
      user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
});

module.exports = router;
