const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

const async = require('async');

router.get('/', function (req, res) {
  const db = new sqlite3.Database('speciesGenerator.db', (err) => {
    if (err) { return console.error(err.message); }
  });

  const QUERY_NAME = 'SELECT * FROM NAME';

  async.series({

    name: function (cb) {
      db.all(QUERY_NAME, function (error, rows) {
        cb(error, rows);
      });
    }

  }, function (error, rows) {
    if (!error) {
      res.render('map', { table_list: rows });
    }
  });
});

module.exports = router;
