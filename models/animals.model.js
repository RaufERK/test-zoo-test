const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  englishName: { type: String, required: true, unique: true },
  description: String,
  picture: [],
});

module.exports = mongoose.model('Animal', animalSchema);
