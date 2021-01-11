const express = require('express');
const router = express.Router();
const aptDescMap = require('../models/AptitudesDescription');
const aptCharMap = require('../models/AptitudeCharacteristics');

/* GET home page. */
router.get('/Chap1', function (req, res, next) {
  res.render('rulesChap1.ejs', { aptitudes: aptDescMap, aptitudesCar: aptCharMap });
});

router.get('/Chap2', function (req, res, next) {
  res.render('rulesChap2', { title: 'Express' });
});

router.get('/Chap3', function (req, res, next) {
  res.render('rulesChap3', { title: 'Express' });
});

router.get('/Chap4', function (req, res, next) {
  res.render('rulesChap4', { title: 'Express' });
});

router.get('/Chap5', function (req, res, next) {
  res.render('rulesChap5', { title: 'Express' });
});

router.get('/Chap6', function (req, res, next) {
  res.render('rulesChap6', { title: 'Express' });
});

module.exports = router;
