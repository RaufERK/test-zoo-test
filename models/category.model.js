const mongoose = require('mongoose');

const Category = new mongoose.Schema({
  category: { type: String, required: true, unique: true },
  description: String,
  animals: [{ type: mongoose.Schema.Types.ObjectId}]
});

module.exports = mongoose.model('Category', Category);
