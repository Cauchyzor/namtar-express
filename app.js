const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const rulesRouter = require('./routes/rules');
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
const gameRouter = require('./routes/game');

const app = express();
const mongoose = require('mongoose');
const password = 'DqknscTrNqtBS9sX9i7m5h8Fk6jaeDCzhSrPKmMR';

mongoose.connect('mongodb+srv://dev-generic:' + password + '@dev.6dqam.mongodb.net/<dbname>?retryWrites=true&w=majority',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

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
app.use('/user', userRouter);
app.use('/rules', rulesRouter);
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
