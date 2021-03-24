const mongoose = require('mongoose');
const colors = require('colors');

const { DB_PATH, MOCK_DB } = process.env;

const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectDB = async () => {
  await mongoose.connect('mongodb+srv://eagle:elbrus-eagles2021@cluster0.anpuf.mongodb.net/week3project?retryWrites=true&w=majority', dbOptions, () => {
    console.log('Database connected'.yellow.bold);
  });
};

module.exports = connectDB;
