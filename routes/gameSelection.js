const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

router.get('/', function (req, res, next) {
  const SELECT_STRING = 'SELECT * FROM game;';

  console.log(req.query);
  console.log(SELECT_STRING);

  const db = new sqlite3.Database('game.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });

  db.all(SELECT_STRING, function (err, rows) {
    if (err) { console.log(err.stack); }
    res.render('gameSelection', { games: rows });
  });

  // close the database connection
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
  });
});

module.exports = router;
