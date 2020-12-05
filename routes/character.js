var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var async = require('async');

router.get('/', function (req, res, next) {

  var QUERY_CHARACTER = "SELECT * FROM character WHERE name='" + req.query.name + "'";
  var QUERY_APTITUDES = "SELECT rank , character_name, aptitude_name, description, type, characteristic_name ,species, biography FROM character_aptitude_set JOIN aptitude ON aptitude.name = character_aptitude_set.aptitude_name JOIN character ON character.name = character_aptitude_set.character_name WHERE character.name='" + req.query.name + "'";
  var QUERY_CHARACTERISTICS = "SELECT rank , character_name, description, characteristic_name ,species, biography FROM character_characteristic_set JOIN character ON character.name = character_characteristic_set.character_name JOIN characteristic ON characteristic.name = character_characteristic_set.characteristic_name WHERE character.name='" + req.query.name + "'";
  var QUERY_SKIILS = "SELECT character_name, skill_name, type, description FROM character_skill_set JOIN skill ON skill.name = character_skill_set.skill_name JOIN character ON character.name = character_skill_set.character_name WHERE character_name='" + req.query.name + "'";

  console.log(QUERY_CHARACTER);
  console.log(QUERY_APTITUDES);
  console.log(QUERY_CHARACTERISTICS);

  var db = new sqlite3.Database('character.db', (err) => {
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
      res.render('character', { tables: rows });
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