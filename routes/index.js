const express = require('express');
const { sessionChecker } = require('../middleware/auth');

const router = express.Router();

router.get('/', async (req, res) => {
  res.render('index', { title: 'App title' });
});

module.exports = router;
