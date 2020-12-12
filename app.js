const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const rulesChap1Router = require('./routes/rulesChap1');
const rulesChap2Router = require('./routes/rulesChap2');
const rulesChap3Router = require('./routes/rulesChap3');
const rulesChap4Router = require('./routes/rulesChap4');
const rulesChap5Router = require('./routes/rulesChap5');
const rulesChap6Router = require('./routes/rulesChap6');
const historyRouter = require('./routes/history');
const bestiaryRouter = require('./routes/bestiary');
const effectsRouter = require('./routes/effects');
const generatorRouter = require('./routes/generator');
const speciesRouter = require('./routes/species');
const mapRouter = require('./routes/map');
const characterRouter = require('./routes/character');
const createPJRouter = require('./routes/createPJ');
const selectionPJRouter = require('./routes/selectionPJ');
const skillsRouter = require('./routes/skills');
const gameSelectionRouter = require('./routes/gameSelection');
const gameRouter = require('./routes/game');

const app = express();

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
app.use('/generator', generatorRouter);
app.use('/species', speciesRouter);
app.use('/map', mapRouter);
app.use('/effects', effectsRouter);
app.use('/character', characterRouter);
app.use('/createPJ', createPJRouter);
app.use('/selectionPJ', selectionPJRouter);
app.use('/skills', skillsRouter);
app.use('/gameSelection', gameSelectionRouter);
app.use('/game', gameRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
