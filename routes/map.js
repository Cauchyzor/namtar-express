var express = require('express');
var router = express.Router();
var sqlite3 = require('sqlite3').verbose();

var async = require('async');

router.get('/', function (req, res) {

	var db = new sqlite3.Database('speciesGenerator.db', (err) => {
		if (err) {
			return console.error(err.message);
		}
	});

	var QUERY_NAME = "SELECT * FROM NAME";

	async.series({

		name: function(cb) {
            db.all(QUERY_NAME, function (error, rows){
                cb(error, rows);
            })
        }
    	
	}, function(error, rows) {
		if (!error) {
			res.render('map', {table_list: rows});
		}

    });

});

module.exports = router;