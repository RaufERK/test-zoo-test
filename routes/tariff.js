const router = require('express').Router();
const Tariff = require('../models/tariffs.model');

router
  .route('/prices')
  .get(async (req, res) => {
    const tariffWeekDays = await Tariff.findOne({ types: 'Будний день' });
    const tariffDaysOff = await Tariff.findOne({ types: 'Выходной день' });
    res.render('tariff', { tariffWeekDays, tariffDaysOff });
  })
  .post(async (req, res) => {
    const tariff = await Tariff.findOne({ types: 'Будний день' });
    res.render('tariff', { tariff });
  });

module.exports = router;
