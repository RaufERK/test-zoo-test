const express = require('express');
const { sessionChecker } = require('../middleware/auth');
const Category = require('../models/category.model');

const router = express.Router();

router.get('/', async (req, res) => {
  const categories = await Category.find().lean();
  console.log(categories);
  res.render('index', { title: 'App title', categories });
});

module.exports = router;
