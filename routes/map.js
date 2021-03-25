const router = require('express').Router();
const Category = require('../models/category.model');

router.route('/map').get((req, res) => {
  res.render('map');
});

router.route('/mapcategorie').get(async (req, res) => {
  const categories = await Category.find();
  res.send(categories);
});
// .post(async (req, res) => {
//   const categories = await Category.find();
// });

module.exports = router;
