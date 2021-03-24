const express = require('express');

const router = express.Router();

router.get('/category/:categoryName', async (req, res) => {
  console.log('CategoryName', req.body.categoryName);
  res.render('animals/category', { title: '' });
});

module.exports = router;
