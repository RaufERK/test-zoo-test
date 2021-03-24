const mongoose = require('mongoose');
const colors = require('colors');

const { DB_PATH, MOCK_DB } = process.env;

const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectDB = async () => {
  await mongoose.connect(MOCK_DB, dbOptions, () => {
    console.log('Database connected'.yellow.bold);
  });
};

module.exports = connectDB;
