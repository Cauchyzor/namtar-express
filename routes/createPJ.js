var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();
var async = require('async');

router.get('/', function (req, res, next) {

  var QUERY_APTITUDES = "SELECT * FROM APTITUDES";
  var QUERY_CHARACTERISTICS = "SELECT * FROM CHARACTERISTICS";
  var db = new sqlite3.Database('characterManagment.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });

  async.series({
    aptitudes: function (cb) {
      db.all(QUERY_APTITUDES, function (error, rows) {
        cb(error, rows);
      })
    },
    characteristics: function (cb) {
      db.all(QUERY_CHARACTERISTICS, function (error, rows) {
        cb(error, rows)
      })
    }

  }, function (error, rows) {
    if (!error) {
      res.render('createPJ', { tables: rows });
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


router.post('/', function (req, res, next) {

  var keys_list_pj = [];
  var values_list_pj = [];
  var data_characteristics = [];
  var data_aptitudes = [];

  for (let [key, value] of Object.entries(req.body)) {
    if (key.startsWith('pj_')) {
      // Extract pj info
      keys_list_pj.push(key.substring(3));
      values_list_pj.push(value);

    } else if (key.startsWith('char_')) {
      // Extract Characteristics info
      data_characteristics.push([req.body["pj_name"], key.substring(5), value]);

    } else if (key.startsWith('apt_')) {
      // Extract aptitudes info
      data_aptitudes.push([req.body["pj_name"], key.substring(4), value]);
    }
  }

  // Generate Query depending of database values and key collected
  var placeholders_pj = keys_list_pj.map((key) => '?').join(',');
  var placeholders_char = data_characteristics.map((key) => data_characteristics[0].map((key) => '?').join(',')).join('),(');
  var placeholders_apt = data_aptitudes.map((key) => data_aptitudes[0].map((key) => '?').join(',')).join('),(');

  var QUERY_STRING_PJ = 'INSERT INTO CHARACTERS (' + keys_list_pj.join(',') + ') VALUES (' + placeholders_pj + ')';
  var QUERY_STRING_CHAR = 'INSERT INTO CHARACTER_CHARACTERISTICS (character_id, characteristic_code, rank) VALUES (' + placeholders_char + ')';
  var QUERY_STRING_APT = 'INSERT INTO CHARACTER_APTITUDES (character_id, aptitude_code, rank) VALUES (' + placeholders_apt + ')';
  var query_list = [
    [QUERY_STRING_APT, data_aptitudes.join(',').split(',')],
    [QUERY_STRING_CHAR, data_characteristics.join(',').split(',')],
    [QUERY_STRING_PJ, values_list_pj]
  ];
  var db = new sqlite3.Database('characterManagment.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });


  // Update database
  query_list.forEach(function (query) {

    db.run(query["0"], query["1"], function (err) {
      console.log(query);
      if (err) {
        res.render('error', { message: err.message, error: err });
        return console.error(err.message);
      } else {
        console.log(`Rows inserted ${this.changes}`);
      }
    });

  });

  // close the database connection
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
  });

  res.status(200).send('Personnage créé !');
});

module.exports = router;