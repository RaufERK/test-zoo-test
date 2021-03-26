const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  name: String,
  phone: String,
  sum: Number,
  date: Date,
  amountChild: Number,
  amountParent: Number,
  paymentSum: {type: Number, default: 0}
});

module.exports = mongoose.model('Client', ClientSchema);
