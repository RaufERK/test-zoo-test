const express = require('express');
const Category = require('../models/category.model');
const Animal = require('../models/animals.model');

const router = express.Router();

router.get('/category/:categoryName', async (req, res) => {
  const { categoryName } = req.params;
  const category = await Category.findOne({ englishName: categoryName }).populate('animals');
  res.render('animals/category', { title: '', category });
});

router.get('/animals', async (req, res) => {
  const categories = await Category.find();
  res.render('animals/categories', { title: '', categories });
});

module.exports = router;
