const express = require('express');
const { sessionChecker } = require('../middleware/auth');
const Category = require('../models/category.model');

const router = express.Router();

router.get('/admin/categories', async (req, res) => {
  const categories = await Category.find().lean();
  res.render('admin/editCategories', { title: 'Редактирование категорий', categories });
});

router.get('/admin/categories/edit/:categoryId', async (req, res) => {
  const category = await Category.findOne({ _id: req.params.categoryId });
  res.render('admin/editCategoryForm.hbs', { title: 'Редактирование категории', category });
});

router.post('/admin/editCategory', async (req, res) => {
  // const category = await Category.findOne({ _id: req.body.categoryId });
  await Category.findByIdAndUpdate(req.body.categoryId, req.body);
  res.redirect('/admin/categories/');
});

module.exports = router;
