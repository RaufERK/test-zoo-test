const mongoose = require('mongoose');
const colors = require('colors');
const Category = require('../models/category.model');
const Animal = require('../models/animals.model');
const { update } = require('../models/animals.model');

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

// seed();

const updateCategories = async () => {
  await mongoose.connect(
    'mongodb+srv://eagle:elbrus-eagles2021@cluster0.anpuf.mongodb.net/week3project?retryWrites=true&w=majority',
    dbOptions,
    () => {
      console.log('Database connected'.yellow.bold);
    }
  );
  const categories = await Category.updateOne(
    { title: 'Паукообразные' },
    {
      coordinates: [50.81654081799782, 42.00059644187822],
      icon:
        'https://cdn4.iconfinder.com/data/icons/halloween-line-terror-night/512/Spider-512.png',
    }
  );
};

// updateCategories();
