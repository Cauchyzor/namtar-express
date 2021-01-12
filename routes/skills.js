const express = require('express');
const router = express.Router();
const Skill = require('../models/Skill');

router.get('/', function (req, res, next) {
  Skill.find()
    .then((skills) => { res.render('skills', { skills: skills }); })
    .catch((error) => { res.status(400).json({ error: error }); });
});

module.exports = router;
