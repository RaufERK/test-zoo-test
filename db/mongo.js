const mongoose = require('mongoose');

const { DB_PATH, MOCK_DB } = process.env;

const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

//Асинхронность Тут не нужна. Можно без асинк-авейта.
const connectDB = async () => {
  await mongoose.connect(DB_PATH, dbOptions, () => {
    console.log('Database connected');
  });
};

module.exports = connectDB;
