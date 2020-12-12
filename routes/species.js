const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();

const async = require('async');

router.get('/', function (req, res) {
  const db = new sqlite3.Database('speciesGenerator.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
  });

  const QUERY_ESPECE = 'SELECT * FROM ESPECE';
  const QUERY_DANGER = 'SELECT * FROM DANGER';
  const QUERY_SOCIAL = 'SELECT * FROM SOCIAL';
  const QUERY_TAILLE = 'SELECT * FROM TAILLE';
  const QUERY_NAME = 'SELECT * FROM NAME';

  async.series({

    espece: function (cb) {
      db.all(QUERY_ESPECE, function (error, rows) {
        cb(error, rows);
      });
    },
    danger: function (cb) {
      db.all(QUERY_DANGER, function (error, rows) {
        cb(error, rows);
      });
    },
    social: function (cb) {
      db.all(QUERY_SOCIAL, function (error, rows) {
        cb(error, rows);
      });
    },
    taille: function (cb) {
      db.all(QUERY_TAILLE, function (error, rows) {
        cb(error, rows);
      });
    },
    race: function (cb) {
      db.all(QUERY_NAME, function (error, rows) {
        cb(error, rows);
      });
    }

  }, function (error, rows) {
    if (!error) {
      res.render('species', { table_list: rows });
    }
  });
});

module.exports = router;
