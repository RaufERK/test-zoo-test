const express = require('express');
const { sessionChecker } = require('../middleware/auth');
const Category = require('../models/category.model');
const multer = require('multer');
const fs = require('fs').promises;

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/image/categories');
  },
  filename: function (req, file, cb) {
    const { englishName } = req.body;
    cb(null, `${englishName}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post('/admin/addCategory', upload.single('filedata'), async (req, res) => {
  const { title, englishName, coordinates, icon, description } = req.body;
  const newCategory = await Category.create({
    title,
    englishName,
    description,
    animals: [],
    coordinates,
    icon,
    picture: req.file.path.slice(6),
  });
  res.redirect('/admin/categories?categoryAdded=1');
});

router.get('/admin/categories', async (req, res) => {
  const categories = await Category.find().lean();
  res.render('admin/editCategories', { title: 'Редактирование категорий', categories });
});

router.get('/admin/categories/edit/:categoryId', async (req, res) => {
  const category = await Category.findOne({ _id: req.params.categoryId });
  res.render('admin/editCategoryForm.hbs', { title: 'Редактирование категории', category });
});

router.get('/admin/categories/delete/:categoryId', async (req, res) => {
  try {
    await Category.findByIdAndDelete({ _id: req.params.categoryId });
    res.sendStatus(200);
  } catch (err) {
    res.send(500).json({ error: 'Не удалось удалить категорию' });
  }
});

router.post('/admin/editCategory', upload.single('filedata'), async (req, res) => {
  const { title, englishName, coordinates, icon, description, picUrl } = req.body;
  let newPicture;
  if (req.file) {
    await fs.rm(`public${picUrl}`);
    newPicture = req.file.path.slice(6);
  } else {
    newPicture = picUrl;
  }

  await Category.findByIdAndUpdate(req.body.categoryId, {
    title,
    englishName,
    coordinates,
    icon,
    description,
    picture: newPicture,
  });
  res.redirect('/admin/categories/');
});

module.exports = router;
