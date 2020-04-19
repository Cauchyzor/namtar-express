var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var async = require('async');

router.get('/', function (req, res, next) {

  var QUERY_STRING = "SELECT * FROM CHARACTERS ORDER BY name";
  // var QUERY_APTITUDES = "SELECT * FROM CHARACTER_APTITUDES JOIN APTITUDES ON CHARACTER_APTITUDES.aptitude_code = APTITUDES.aptitude_code";
  // var QUERY_CHARACTERISTICS = "SELECT * FROM CHARACTER_CHARACTERISTICS JOIN CHARACTERISTICS ON CHARACTER_CHARACTERISTICS.characteristic_code = CHARACTERISTICS.characteristic_code";

  var db = new sqlite3.Database('characterManagment.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });

  db.all(QUERY_STRING, function (err, rows) {
    res.render('selectionPJ', { characters : rows });
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