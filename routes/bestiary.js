const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

const async = require('async');

router.get('/', function (req, res, next) {
  const db = new sqlite3.Database('speciesGenerator.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
  });

  const QUERY_ESPECE = 'SELECT * FROM ESPECE';
  const QUERY_RACE = 'SELECT * FROM RACE';

  async.series({
    espece: function (cb) {
      db.all(QUERY_ESPECE, function (error, rows) {
        cb(error, rows);
      });
    },
    race: function (cb) {
      db.all(QUERY_RACE, function (error, rows) {
        cb(error, rows);
      });
    }

  }, function (error, rows) {
    if (!error) {
      res.render('bestiary', { table_list: rows });
    }
  });
});

module.exports = router;
