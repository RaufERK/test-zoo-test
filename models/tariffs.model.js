const mongoose = require('mongoose');

const tariffsSchema = new mongoose.Schema({
  types: {
    type: String,
    required: true
  },
  priceToChildren: {
    type: Number,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
})


module.exports = mongoose.model('Tariff', tariffsSchema)
