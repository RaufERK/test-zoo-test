const router = require('express').Router();
const Tariff = require('../models/tariffs.model');
const Client = require('../models/client.model');

router
  .route('/prices')
  .get(async (req, res) => {
    const tariffWeekDays = await Tariff.findOne({ types: 'Будний день' });
    const tariffDaysOff = await Tariff.findOne({ types: 'Выходной день' });
    res.render('tariffs/tariff', { tariffWeekDays, tariffDaysOff });
  })
  .post(async (req, res) => {
    try {
      const client = await Client.create({
        name: req.body.name,
        phone: req.body.phone,
        date: new Date(req.body.date),
        amountChild: req.body.childTicket,
        amountParent: req.body.parentTicket,
      });
      res.redirect('/');
    } catch (err) {
      console.log(err);
    }
  });

  router
    .route('/payment')
    .get(async (req, res) => {
      res.render('tariffs/payment');
    })
    // .post(async (req, res) => {
    //   try {
    //   } catch (err) {
    //     console.log(err);
    //   }
    // });

router
  .route('/admin/prices')
  .get(async (req, res) => {
    const tariffs = await Tariff.find();
    res.render('admin/editTarrifs', {
      tariffs,
      title: 'Редактирование тарифов',
    });
  })
  .post(async (req, res) => {
    try {
      await Tariff.updateOne(
        { _id: req.body.id },
        {
          priceToChildren: +req.body.priceToChildren,
          price: +req.body.price,
        }
      );
      res.redirect(`/admin/prices`);
    } catch (err) {
      console.log(err);
    }
  });


module.exports = router;
