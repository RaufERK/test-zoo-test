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
        sum: +req.body.sum,
      });
      req.session.clientId = client._id;
      res.status(200).json(client);
    } catch (err) {
      res.sendStatus(400);
    }
  });

router
  .route('/payment')
  .get(async (req, res) => {
    if (req.session.clientId) {
      const client = await Client.findOne({ _id: req.query.id });
      const sum = req.query.sum;
      res.render('tariffs/payment', { sum, client });
    } else {
      res.redirect('/prices');
    }
  })

  .post(async (req, res) => {
    try {
      await Client.updateOne(
        { _id: req.query.id },
        {
          paymentSum: +req.query.sum,
        }
      );
      res.send('Оплата прошла успешно. Ждем вас в нашем зоопарке');
    } catch (err) {
      console.log(err);
    }
  });

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
