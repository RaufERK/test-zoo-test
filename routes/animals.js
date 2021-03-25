const express = require('express');
const Category = require('../models/category.model');
const Animal = require('../models/animals.model');

const router = express.Router();

router.get('/category/:categoryName', async (req, res) => {
  const { categoryName } = req.params;

  const category = await Category.findOne({ englishName: categoryName })
    .populate('animals')
    .lean();
  category.animals.forEach((animal) => (animal.mainpic = animal.picture[0]));
  res.render('animals/category', { title: '', category });
});

router.get('/animals', async (req, res) => {
  const categories = await Category.find();
  res.render('animals/categories', { title: '', categories });
});

router.get('/animals/:animalName', async (req, res) => {
  const { animalName: englishName } = req.params;
  const animal = await Animal.findOne({ englishName }).lean();
  animal.pictureIndex = [];
  animal.picture.forEach((picture, index) => {
    animal.pictureIndex.push(index + 1);
  });
  const category = await Category.find().populate('Animal');
  const resultCategory = category.find((el) => el.animals.includes(animal._id));
  res.render('animals/animal', { title: animal.name, animal, resultCategory });
});

router.route('animal/:id').get(async (req, res) => {
  const animal = await Animal.findById(req.params.id);
});

module.exports = router;
