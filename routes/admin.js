const router = require('express').Router();
const fs = require('fs').promises;

const Animal = require('../models/animals.model');
const upload = require('../middleware/multer');

router
  .route('/')
  .get((req, res) => {
    res.render('adminPage');
  })
  // Подключаем multer для routе '/admin'
  .post(upload.array('filedata') ,async (req, res) => {
    const { name, description } = req.body;
    console.log('данные ====>', req.body);
    console.log(req.file);
    const { path } = req.file;
    await Animal.create({ name, description, picture: [path] });

    res.send('Все Ок');
  });

module.exports = router;
