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

	var QUERY_ESPECE = "SELECT * FROM ESPECE";
	var QUERY_DANGER = "SELECT * FROM DANGER";
	var QUERY_SOCIAL = "SELECT * FROM SOCIAL";
	var QUERY_TAILLE = "SELECT * FROM TAILLE";

	async.series({

		espece: function(cb) {
            db.all(QUERY_ESPECE, function (error, rows){
                cb(error, rows);
            })
        },	
        danger: function(cb){
            db.all(QUERY_DANGER, function (error, rows){
                cb(error, rows)
            })
        },
        social: function(cb){
            db.all(QUERY_SOCIAL, function (error, rows){
                cb(error, rows)
            })
        },
        taille: function(cb){
            db.all(QUERY_TAILLE, function (error, rows){
                cb(error, rows)
            })
        }          
    	
	}, function(error, rows) {
		if (!error) {
			res.render('species', {table_list: rows});
		}

    });

});

module.exports = router;