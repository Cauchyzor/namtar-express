var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var reglesChap1Router = require('./routes/reglesChap1');
var reglesChap2Router = require('./routes/reglesChap2');
var reglesChap3Router = require('./routes/reglesChap3');
var reglesChap4Router = require('./routes/reglesChap4');
var reglesChap5Router = require('./routes/reglesChap5');
var reglesChap6Router = require('./routes/reglesChap6');
var histoireRouter = require('./routes/histoire');
var bestiaireRouter = require('./routes/bestiaire');
var effetsRouter = require('./routes/effets');
var generateurRouter = require('./routes/generateur');
var speciesRouter = require('./routes/species');
var mapRouter = require('./routes/map');
var fichePersoRouter = require('./routes/fichePerso');
var createPJRouter = require('./routes/createPJ');
var selectionPJRouter = require('./routes/selectionPJ');
var competencesRouter = require('./routes/competences');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/reglesChap1', reglesChap1Router);
app.use('/reglesChap2', reglesChap2Router);
app.use('/reglesChap3', reglesChap3Router);
app.use('/reglesChap4', reglesChap4Router);
app.use('/reglesChap5', reglesChap5Router);
app.use('/reglesChap6', reglesChap6Router);
app.use('/histoire', histoireRouter);
app.use('/bestiaire', bestiaireRouter);
app.use('/generateur', generateurRouter);
app.use('/species', speciesRouter);
app.use('/map', mapRouter);
app.use('/effets', effetsRouter);
app.use('/fichePerso', fichePersoRouter);
app.use('/createPJ', createPJRouter);
app.use('/selectionPJ', selectionPJRouter);
app.use('/competences', competencesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
