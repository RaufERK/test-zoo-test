const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
  category: {type: mongoose.Schema.Types.ObjectId,},
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: String,
  picture: [],
});

module.exports = mongoose.model('Animal', animalSchema);
