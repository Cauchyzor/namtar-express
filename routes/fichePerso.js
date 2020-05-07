var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var async = require('async');

router.get('/', function (req, res, next) {

  var QUERY_CHARACTER = "SELECT * FROM CHARACTERS WHERE name='" + req.query.name + "'";
  var QUERY_APTITUDES = "SELECT * FROM CHARACTER_APTITUDES JOIN APTITUDES ON CHARACTER_APTITUDES.aptitude_code = APTITUDES.aptitude_code WHERE character_id='" + req.query.name + "'";
  var QUERY_CHARACTERISTICS = "SELECT * FROM CHARACTER_CHARACTERISTICS JOIN CHARACTERISTICS ON CHARACTER_CHARACTERISTICS.characteristic_code = CHARACTERISTICS.characteristic_code WHERE character_id='" + req.query.name + "'";
  var QUERY_SKILLS = "SELECT * FROM CHARACTER_SKILLS JOIN SKILLS ON CHARACTER_SKILLS.skill_code = SKILLS.skill_code WHERE character_id='" + req.query.name + "'";

  var db = new sqlite3.Database('characterManagment.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });

  async.series({
    characters: function (cb) {
      db.all(QUERY_CHARACTER, function (error, rows) {
        cb(error, rows);
      })
    },
    aptitudes: function (cb) {
      db.all(QUERY_APTITUDES, function (error, rows) {
        cb(error, rows);
      })
    },
    characteristics: function (cb) {
      db.all(QUERY_CHARACTERISTICS, function (error, rows) {
        cb(error, rows)
      })
    },
    skills: function (cb) {
      db.all(QUERY_SKILLS, function (error, rows) {
        cb(error, rows)
      })
    }
  }, function (error, rows) {
    if (!error) {
      res.render('fichePerso', { tables: rows });
    } else {
      console.log(error);
    }
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