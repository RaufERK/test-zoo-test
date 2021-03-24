const mongoose = require('mongoose');
const Tariff = require('../models/tariffs.model');
const connectDB = require('./mongo');

connectDB();

const createTariff = async () => {
  const tariff = await Tariff.create([
    {
      types: 'Будний день',
      priceToChildren: 100,
      price: 300,
    },
    {
      types: 'Выходной день',
      priceToChildren: 200,
      price: 500,
    },
  ]);
};
// createTariff();
