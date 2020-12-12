const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

router.get('/', function (req, res, next) {

  let QUERY_STRING = "SELECT * FROM game;"

  console.log(req.query);
  console.log(QUERY_STRING);

  let db = new sqlite3.Database('game.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });

  db.all(QUERY_STRING, function (err, rows) {
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