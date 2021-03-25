const router = require('express').Router();
const Category = require('../models/category.model');

router.route('/map').get((req, res) => {
  res.render('map');
});

router.route('/mapcategories').get(async (req, res) => {
  const categories = await Category.find();
  res.send(categories);
});

module.exports = router;
