const express = require('express');
const Category = require('../models/category.model');
const Animal = require('../models/animals.model');

const router = express.Router();

router.get('/category/:categoryName', async (req, res) => {
  const { categoryName } = req.params;
  const category = await Category.findOne({
    englishName: categoryName,
  }).populate('animals');
  // const animalsWithPics =
  res.render('animals/category', { title: '', category });
});

router.get('/animals', async (req, res) => {
  const categories = await Category.find();
  res.render('animals/categories', { title: '', categories });
});

router
  .route('/animals/edit/:id')
  .get(async (req, res) => {
    const { id } = req.params;
    const animal = await Animal.findById(id).lean();
    // console.log(animal);
    const category = await Category.find(); //.lean();

    const curCategory = category.find((el) => el.animals.includes(id));
    // console.log('curCategory================>>>',curCategory);

    const editCategory = category.map((el) => {
      const newObj = el.lean();

      newObj.test = 'TEST';
      console.log(
        el.title,
        newObj.title,
        curCategory.title,
        newObj.title === curCategory.title ? true : false
      );
      newObj.selectedCategory =
        newObj.title === curCategory.title ? true : false;
      // console.log(newObj);
      // console.log('дескрипторы',Object.getOwnPropertyDescriptors(el));
      return newObj;
    });
    console.log('================>', editCategory[2]);

    res.render('admin/editAnimals', {
      animal,
      category: editCategory,
      curCategory,
    });
  })
  .post((req, res) => {
    console.log(req.body);
  });

router.get('/animals/:animalName', async (req, res) => {
  const { animalName: englishName } = req.params;
  // console.log('animal name ======= ', animalName);

  const animal = await Animal.findOne({ englishName });
  console.log(animal);
  res.render('animals/animal', { title: '', animal });
});

module.exports = router;
