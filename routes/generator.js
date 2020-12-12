const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

router.get('/', function (req, res) {
  const SELECT_STRING = 'SELECT * FROM mark;';
  const db = new sqlite3.Database('character.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
  });

  db.all(SELECT_STRING, function (err, rows) {
    if (err) { console.log(err.stack); }
    res.render('generator', { skill: 'AJAX is great!', effects_list: rows });
  });

  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
  });
});

module.exports = router;
