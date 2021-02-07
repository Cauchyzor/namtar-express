const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const userCtrl = require('../controllers/userCtrl');
const characterCtrl = require('../controllers/characterCtrl');

router.get('/', function (req, res) {
  res.render('login');
});

router.get('/profil', auth, userCtrl.findUser );
router.post('/login', userCtrl.loging);
router.post('/signup', userCtrl.signup);
router.get('/character/selection', auth, characterCtrl.selectCharacter);
router.get('/character/skills', auth, characterCtrl.getAllSkill);
router.get('/character/sheet', auth, characterCtrl.getCharacterInfo);
router.get('/character/create', auth, characterCtrl.getCharacterCreation);
router.post('/character/create', auth, characterCtrl.createCharacter);

module.exports = router;
