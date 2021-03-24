const router = require('express').Router();
const Tariff = require('../models/tariffs.model');

router.route('/prices').get(async (req, res) => {
  const tariffWeekDays = await Tariff.findOne({ types: 'Будний день' });
  const tariffDaysOff = await Tariff.findOne({ types: 'Выходной день' });
  res.render('tariffs/tariff', { tariffWeekDays, tariffDaysOff });
});

router
  .route('/admin/prices')
  .get(async (req, res) => {
    const tariffs = await Tariff.find();
    res.render('tariffs/tariffEdit', { tariffs });
  })
  .post(async (req, res) => {
    console.log(req.body);
    // const { id, priceToChildren, price } = req.body;
    await Tariff.updateOne(
      { _id: req.body.id },
      {
        priceToChildren: +req.body.priceToChildren,
        price: +req.body.price,
      }
    );
  });
module.exports = router;
