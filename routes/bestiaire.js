var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();

var async = require('async');

router.get('/', function(req, res, next) {

	var db = new sqlite3.Database('speciesGenerator.db', (err) => {
		if (err) {
			return console.error(err.message);
		}
	});

	var QUERY_ESPECE = "SELECT * FROM ESPECE";
	var QUERY_RACE = "SELECT * FROM RACE";

	async.series({

		espece: function(cb) {
            db.all(QUERY_ESPECE, function (error, rows){
                cb(error, rows);
            })
        },
        race: function(cb){
            db.all(QUERY_RACE, function (error, rows){
                cb(error, rows)
            })
        }
    	
	}, function(error, rows) {
		if (!error) {
			res.render('bestiaire', {table_list: rows});
		}

    });


});

module.exports = router;