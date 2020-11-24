var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();

/* GET home page. */
router.get('/', function (req, res, next) {
  
  var QUERY_STRING = "SELECT * FROM aptitude";
  var db = new sqlite3.Database('character.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });

  db.all(QUERY_STRING, function (err, rows) {
    res.render('rulesChap1.ejs', { aptitudes: rows });
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