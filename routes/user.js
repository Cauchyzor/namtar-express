const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Character = require('../models/Character');
const Skill = require('../models/Skill');
const aptCharMap = require('../models/AptitudeCharacteristics');
const aptTypeMap = require('../models/AptitudesAttributes');
const aptDescMap = require('../models/AptitudesDescription');

router.get('/', function (req, res) {
  res.render('login');
});

router.get('/profil', auth, function (req, res) {
  // req.userId should be populated by a middleware auth
  User.findOne({ _id: req.userId })
    .then(user => res.status(200).render('userInfo', { user: user }))
    .catch(error => res.status(400).json({ error }));
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
          req.session.token = jwt.sign({ userId: user._id }, 'RANDOM_SECRET', { expiresIn: '24h' });
          res.status(200).redirect('/user/profil');
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

router.get('/character/selection', auth, function (req, res, next) {
  User.findOne({ _id: req.userId })
    .populate('characters')
    .then(user => { console.log(user); res.render('characterSelection', { user: user }); })
    .catch(error => { res.status(400).json({ error: error }); });
});

router.get('/character/skills', auth, function (req, res, next) {
  Skill.find()
    .then((skills) => { res.render('characterSkills', { skills: skills }); })
    .catch((error) => { res.status(400).json({ error: error }); });
});

router.get('/character/sheet', auth, function (req, res, next) {
  Character.findOne({ _id: req.query._id })
    .populate('compétences')
    .then((character) => {
      const aptitudes = Object.entries(character.aptitudes);
      const characteristics = Object.entries(character.caractéristiques);

      aptitudes.shift();
      characteristics.shift();
      res.render('characterSheet', { character: character, characteristics: characteristics, aptitudes: aptitudes, skills: character.compétences });
    })
    .catch((error) => { res.status(400).json({ error: error }); });
});

router.get('/character/create', auth, function (req, res, next) {
  Skill.find()
    .then((skills) => {
      const characteristics = [];
      const aptitudes = [];

      Character.schema.eachPath((path) => {
        if (/^caractéristiques.*/.test(path)) {
          return characteristics.push({
            name: path.replace(/^(caractéristiques.)*/, '')
          });
        } else if (/^aptitudes.*/.test(path)) {
          return aptitudes.push({
            name: path.replace(/^(aptitudes.)*/, ''),
            characteristic: aptCharMap.get(path.replace(/^(aptitudes.)*/, '')),
            type: aptTypeMap.get(path.replace(/^(aptitudes.)*/, '')),
            description: aptDescMap.get(path.replace(/^(aptitudes.)*/, ''))
          });
        }
      });
      res.render('characterCreation', { characteristics: characteristics, aptitudes: aptitudes, skills: skills });
    })
    .catch((error) => { res.status(400).json({ error: error }); });
});

router.post('/character/create', auth, function (req, res, next) {
  console.log(req.body);
  Object.filterAndTransform = (obj, regExp) => {
    const entries = Object.entries(obj)
      .filter(([name, score]) => regExp.test(name))
      .map(([k, v]) => [k.replace(regExp, ''), v]);
    return Object.fromEntries(entries);
  };

  const characteristics = Object.filterAndTransform(req.body, /^char_*/);
  const aptitudes = Object.filterAndTransform(req.body, /^apt_*/);
  const skill = Object.filterAndTransform(req.body, /^skl_*/);

  const character = new Character({
    nom: req.body.pj_name,
    espèce: req.body.pj_species,
    bio: req.body.pj_biography,
    caractéristiques: characteristics,
    aptitudes: aptitudes,
    compétences: Object.keys(skill)
  });

  character.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !' }))
    .catch(error => res.status(500).json({ error }));
  // res.status(201).json({ message: 'Requête envoyée !' });
});

module.exports = router;
