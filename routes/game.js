const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const gameCtrl = require('../controllers/gameCtrl');

router.get('/selection', auth, gameCtrl.findAllGames);
router.get('/engine', auth, gameCtrl.populateGameStates);
router.post('/comment/', gameCtrl.postComment);
router.get('/owner/selection', auth, gameCtrl.findAllGamesOwner);
router.post('/owner/selection', auth, gameCtrl.createGame);
router.get('/owner/engine', auth, gameCtrl.populateGameStatesOwner);
router.post('/owner/createState', auth, gameCtrl.createState);
router.get('/owner/stateEditor', auth, gameCtrl.getOneState);
router.post('/owner/stateEditor', auth, gameCtrl.editState);

module.exports = router;
