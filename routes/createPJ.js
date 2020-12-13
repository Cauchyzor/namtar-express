const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const async = require('async');

// TODO : implementer la gestion d'erreur
// TODO : L'operation post envoir un req.bofy avec 5* la même information => comprendre et corriger si besoin

router.get('/', function (req, res, next) {
  const SELECT_APTITUDES = 'SELECT * FROM aptitude ORDER BY type';
  const SELECT_CHARACTERISTICS = 'SELECT * FROM characteristic';
  const SELECT_SKILLS = 'SELECT * FROM skill';

  const db = new sqlite3.Database('character.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });

  async.series({
    aptitudes: function (cb) {
      db.all(SELECT_APTITUDES, function (error, rows) {
        cb(error, rows);
      });
    },
    characteristics: function (cb) {
      db.all(SELECT_CHARACTERISTICS, function (error, rows) {
        cb(error, rows);
      });
    },
    skills: function (cb) {
      db.all(SELECT_SKILLS, function (error, rows) {
        cb(error, rows);
      });
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
  const keysListPj = [];
  const valuesListPj = [];
  const valuesChar = [];
  const valuesApt = [];
  const valuesSkl = [];

  // create PJ id for unicity on BD
  const characterName = req.body.pj_name.trim().toLowerCase().replace(' ', '_');

  for (const [key, value] of Object.entries(req.body)) {
    if (key.startsWith('pj_')) {
      // Extract pj info
      keysListPj.push(key.substring(3));
      valuesListPj.push(value);
    } else if (key.startsWith('char_')) {
      // Extract Characteristics info
      valuesChar.push([characterName, key.substring(5), value]);
    } else if (key.startsWith('apt_')) {
      // Extract aptitudes info
      valuesApt.push([characterName, key.substring(4), value]);
    } else if (key.startsWith('skl_')) {
      // Extract aptitudes info
      valuesSkl.push([characterName, key.substring(4)]);
    }
  }

  // Generate Query depending of database values and key collected
  const placeholdersPj = keysListPj.map((key) => '?').join(',');
  const placeholdersChar = valuesChar.map((key) => valuesChar[0].map((key) => '?').join(',')).join('),(');
  const placeholdersApt = valuesApt.map((key) => valuesApt[0].map((key) => '?').join(',')).join('),(');
  const placeholdersSkl = valuesSkl.map((key) => valuesSkl[0].map((key) => '?').join(',')).join('),(');

  const INSERT_PJ = 'INSERT INTO character (' + keysListPj.join(',') + ') VALUES (' + placeholdersPj + ')';
  const INSERT_CHAR = 'INSERT INTO character_characteristic_set (character_name, characteristic_name, rank) VALUES (' + placeholdersChar + ')';
  const INSERT_APT = 'INSERT INTO character_aptitude_set (character_name, aptitude_name, rank) VALUES (' + placeholdersApt + ')';

  const queryList = [
    [INSERT_PJ, valuesListPj],
    [INSERT_CHAR, valuesChar.join(',').split(',')],
    [INSERT_APT, valuesApt.join(',').split(',')]
  ];

  // exclude skill list treatment for null values expectation
  if (valuesSkl.length > 0) {
    const INSERT_SKL = 'INSERT INTO character_skill_set (character_name, skill_name) VALUES (' + placeholdersSkl + ')';
    queryList.push(INSERT_SKL, valuesSkl.join(',').split(','));
  }

  const db = new sqlite3.Database('character.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });

  // Update database
  queryList.forEach(function (query) {
    db.run(query['0'], query['1'], function (err) {
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
    if (err) { return console.error(err.message); }
    console.log('Close the database connection.');
  });

  res.status(200).send('Personnage créé !');
});

module.exports = router;
