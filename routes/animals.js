const express = require('express');
const Category = require('../models/category.model');
const Animal = require('../models/animals.model');

const router = express.Router();

router.get('/category/:categoryName', async (req, res) => {
  const { categoryName } = req.params;
  const category = await Category.findOne({ englishName: categoryName }).populate('animals');
  // const animalsWithPics = 
  res.render('animals/category', { title: '', category });
});

router.get('/animals', async (req, res) => {
  const categories = await Category.find();
  res.render('animals/categories', { title: '', categories });
});

router.get('/animals/:animalName', async (req, res) => {
  const { animalName: englishName } = req.params;
  // console.log('animal name ======= ', animalName);

  const animal = await Animal.findOne({ englishName });
  console.log(animal);
  res.render('animals/animal', { title: '', animal });
});

router.route('animal/:id').get( async (req, res) => {
  const animal = await Animal.findById(req.params.id);
  console.log(animal);
})

module.exports = router;
