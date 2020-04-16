var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();

/* GET home page. */
router.get('/', function (req, res, next) {

  var db = new sqlite3.Database('spellGenerator.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });

  var rows = db.all("SELECT * FROM APTITUDES", function (err, rows) {
    res.render('createPJ', { aptitudeList: rows });
  });

  // close the database connection
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
  });
});


// Handle Genre create on POST.
router.post('/', function (req, res, next) {

  // output the INSERT statement
  var form_keys = Object.keys(req.body);
  var form_values = Object.values(req.body)
  var keys_string = form_keys.join(',')
  var placeholders = form_keys.map((key) => '?').join(',');

  var QUERY_STRING = 'INSERT INTO CHARACTERS (' + keys_string + ') VALUES (' + placeholders +')';
  var db = new sqlite3.Database('spellGenerator.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });

  console.log(QUERY_STRING);

  db.run(QUERY_STRING, form_values, function (err) {
    if (err) {
      res.render('error',{message: err.message, error: err});
      return console.error(err.message);
    }
    console.log(`Rows inserted ${this.changes}`);
    res.status(200).send('Personnage créé !')
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