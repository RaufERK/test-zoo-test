const express = require('express');
const { sessionChecker } = require('../middleware/auth');
const Category = require('../models/category.model');

const router = express.Router();

router.get('/admin/categories', async (req, res) => {
  const categories = await Category.find().lean();
  console.log(categories);
  res.render('admin/editCategories', { title: 'Редактирование категорий', categories });
});

module.exports = router;
