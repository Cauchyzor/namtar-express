const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const async = require('async');

// TODO : implementer la gestion d'erreur
// TODO : L'operation post envoir un req.bofy avec 5* la même information => comprendre et corriger si besoin

router.get('/', function (req, res, next) {

  let QUERY_APTITUDES = "SELECT * FROM aptitude ORDER BY type";
  let QUERY_CHARACTERISTICS = "SELECT * FROM characteristic";
  let db = new sqlite3.Database('character.db', (err) => {
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
    },
    skills: function (cb) {
      db.all(QUERY_SKILLS, function (error, rows) {
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

  let keys_list_pj = [];
  let values_list_pj = [];
  let data_characteristics = [];
  let data_aptitudes = [];
  let data_skill = [];

  //create PJ id for unicity on BD
  let character_name = req.body['pj_name'].trim().toLowerCase().replace(" ", "_");

  for (let [key, value] of Object.entries(req.body)) {
    if (key.startsWith('pj_')) {
      // Extract pj info
      keys_list_pj.push(key.substring(3));
      values_list_pj.push(value);
    } else if (key.startsWith('char_')) {
      // Extract Characteristics info
      data_characteristics.push([character_name, key.substring(5), value]);

    } else if (key.startsWith('apt_')) {
      // Extract aptitudes info
      data_aptitudes.push([character_name, key.substring(4), value]);
    }
  }

  // Generate Query depending of database values and key collected
  let placeholders_pj = keys_list_pj.map((key) => '?').join(',');
  let placeholders_char = data_characteristics.map((key) => data_characteristics[0].map((key) => '?').join(',')).join('),(');
  let placeholders_apt = data_aptitudes.map((key) => data_aptitudes[0].map((key) => '?').join(',')).join('),(');
  let placeholders_skl = data_skill.map((key) => data_skill[0].map((key) => '?').join(',')).join('),(');

  let QUERY_STRING_PJ = 'INSERT INTO character (' + keys_list_pj.join(',') + ') VALUES (' + placeholders_pj + ')';
  let QUERY_STRING_CHAR = 'INSERT INTO character_characteristic_set (character_name, characteristic_name, rank) VALUES (' + placeholders_char + ')';
  let QUERY_STRING_APT = 'INSERT INTO character_aptitude_set (character_name, aptitude_name, rank) VALUES (' + placeholders_apt + ')';
  let query_list = [
    [QUERY_STRING_PJ, values_list_pj],
    [QUERY_STRING_CHAR, data_characteristics.join(',').split(',')],
    [QUERY_STRING_APT, data_aptitudes.join(',').split(',')],
    [QUERY_STRING_SKILL, data_skill.join(',').split(',')]
  ];
  let db = new sqlite3.Database('character.db', (err) => {
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