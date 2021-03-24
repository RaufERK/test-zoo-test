const mongoose = require('mongoose');
const colors = require('colors');
const Category = require('../models/category.model');
const Animal = require('../models/animals.model');

// const { DB_PATH, MOCK_DB } = process.env;

const dbOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const seed = async () => {
  await mongoose.connect(
    'mongodb+srv://eagle:elbrus-eagles2021@cluster0.anpuf.mongodb.net/week3project?retryWrites=true&w=majority',
    dbOptions,
    () => {
      console.log('Database connected'.yellow.bold);
    }
  );

  const categories = [
    {
      title: 'Млекопитающие',
      englishName: 'mammals',
      picture: '/img/mammals.jpeg',
      animals: [],
    },
    {
      title: 'Рыбы',
      englishName: 'fish',
      picture: '/img/fish.webp',
      animals: [],
    },
    {
      title: 'Птицы',
      englishName: 'birds',
      picture: '/img/birds.jpeg',
      animals: [],
    },
    {
      title: 'Рептилии',
      englishName: 'reptiles',
      picture: '/img/reptiles.jpg',
      animals: [],
    },
    {
      title: 'Насекомые',
      englishName: 'insects',
      picture: '/img/insects.jpeg',
      animals: [],
    },
  ];

  // const mammals = await Category.findOne({ englishName: 'mammals' });

  const animals = await Animal.find();

  await Category.findOneAndUpdate({ englishName: 'mammals', animals: animals });
};

seed();
