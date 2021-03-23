const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true },
  userName: String,
  fee: Number,
  password: { type: String, required: true },
  role: {
    type: String,
    default: 'User',
  },
});

module.exports = mongoose.model('User', UserSchema);
