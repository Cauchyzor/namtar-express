var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();

router.get('/', function (req, res) {
  var QUERY_STRING = "SELECT * FROM TYPE;";
  var db = new sqlite3.Database('speciesGenerator.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
  });
  db.all(QUERY_STRING, function (err, rows) {
    res.render('species', { species: "AJAX is great!", especes_list: rows });
  });
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
  });
});

module.exports = router;