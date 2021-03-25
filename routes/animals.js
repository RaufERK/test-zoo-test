const express = require('express');
const Category = require('../models/category.model');
const Animal = require('../models/animals.model');

const router = express.Router();

router.get('/category/:categoryName', async (req, res) => {
  const { categoryName } = req.params;

  const category = await Category.findOne({ englishName: categoryName }).populate('animals').lean();
  category.animals.forEach((animal) => (animal.mainpic = animal.picture[0]));
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
    const animal = await Animal.findById(id);
    const category = await Category.find();
    const curCategory = category.find((el) => el.animals.includes(id));

    const editCategory = category.map(({_id, title}) => {
      return {
        _id,
        title,
        selected: title === curCategory.title ? true : false
      }
    });

    res.render('admin/editAnimals', {
      animal,
      editCategory,
      curCategory,
    });
  })
  .post((req, res) => {
    console.log(req.body);
  });



router.get('/animals/:animalName', async (req, res) => {
  const { animalName: englishName } = req.params;
  const animal = await Animal.findOne({ englishName }).lean();
  animal.pictureIndex = [];
  animal.picture.forEach((picture, index) => {
    animal.pictureIndex.push(index + 1);
  });
  console.log(animal);
  res.render('animals/animal', { title: animal.name, animal });
});


router.route('animal/:id').get(async (req, res) => {
  const animal = await Animal.findById(req.params.id);
  console.log(animal);
});

module.exports = router;
