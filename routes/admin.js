const router = require('express').Router();

const Animal = require('../models/animals.model');
const Category = require('../models/category.model');
const upload = require('../middleware/multer');

router
  .route('/')
  .get(async (req, res) => {
    const categoty = await Category.find();
    res.render('admin/adminPage');
  })
  // Подключаем multer для routе '/admin'
  .post(upload.single('filedata'), async (req, res) => {
    console.log('данные ====>', req.body);
    console.log(req.files);
    const { name, description, englishName } = req.body;
    const { path } = req.file;
    await Animal.create({ name, description, englishName, picture: path });

    res.status(200).send('Ok');
  });

router.post('/addCategory', async (req, res) => {
  const newCategory = await Category.create(req.body);
  console.log(newCategory);
  res.redirect('/admin/categories?categoryAdded=1');
});

module.exports = router;
