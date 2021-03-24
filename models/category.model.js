const mongoose = require('mongoose');

const Category = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  englishName: { type: String, required: true, unique: true },
  picture: String,
  description: String,
  animals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Animal' }],
});

module.exports = mongoose.model('Category', Category);


