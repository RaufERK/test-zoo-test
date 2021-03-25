const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  name: String,
  phone: String,
  sum: String,
  date: Date,
  amountChild: Number,
  amountParent: Number,
});

module.exports = mongoose.model('Client', ClientSchema);
