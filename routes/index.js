const express = require('express');
const { sessionChecker } = require('../middleware/auth');
const Tariff = require('../models/tariffs.model');

const router = express.Router();

router.get('/', async (req, res) => {
  res.render('index', { title: 'App title' });
});

router
  .route('/tariff')
  .get(async (req, res) => {
    const tariffWeekDays = await Tariff.findOne({ types: 'Будний день' });
    res.render('tariff', { tariffWeekDays });
  })
  .post(async (req, res) => {
    const tariffWeekDays = await Tariff.findOne({ types: 'Будний день' });
    const tariffDaysOff = await Tariff.findOne({ types: 'Выходной день' });
    res.render('tariff', { tariffDaysOff, tariffWeekDays });
  });

module.exports = router;
