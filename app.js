var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var rulesChap1Router = require('./routes/rulesChap1');
var rulesChap2Router = require('./routes/rulesChap2');
var rulesChap3Router = require('./routes/rulesChap3');
var rulesChap4Router = require('./routes/rulesChap4');
var rulesChap5Router = require('./routes/rulesChap5');
var rulesChap6Router = require('./routes/rulesChap6');
var historyRouter = require('./routes/history');
var bestiaryRouter = require('./routes/bestiary');
var effetsRouter = require('./routes/effets');
var generateurRouter = require('./routes/generateur');
var speciesRouter = require('./routes/species');
var mapRouter = require('./routes/map');
var characterRouter = require('./routes/character');
var createPJRouter = require('./routes/createPJ');
var selectionPJRouter = require('./routes/selectionPJ');
var skillsRouter = require('./routes/skills');

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
app.use('/rulesChap1', rulesChap1Router);
app.use('/rulesChap2', rulesChap2Router);
app.use('/rulesChap3', rulesChap3Router);
app.use('/rulesChap4', rulesChap4Router);
app.use('/rulesChap5', rulesChap5Router);
app.use('/rulesChap6', rulesChap6Router);
app.use('/history', historyRouter);
app.use('/bestiary', bestiaryRouter);
app.use('/generateur', generateurRouter);
app.use('/species', speciesRouter);
app.use('/map', mapRouter);
app.use('/effets', effetsRouter);
app.use('/character', characterRouter);
app.use('/createPJ', createPJRouter);
app.use('/selectionPJ', selectionPJRouter);
app.use('/skills', skillsRouter);

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
