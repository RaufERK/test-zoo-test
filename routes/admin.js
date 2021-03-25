const router = require('express').Router();

const Animal = require('../models/animals.model');
const Category = require('../models/category.model');
const upload = require('../middleware/multer');

router
  .route('/')
  .get(async (req, res) => {
    const categoty = await Category.find();
    res.render('admin/adminPage', { categoty });
  })
  // Подключаем multer для routе '/admin'
  .post(upload.any('filedata'), async (req, res) => {
    const { name, description, englishName, categoryes } = req.body;

    const allPath = req.files.map((el) => el.path.slice(6));
    const newAnimal = await Animal.create({ name, description, englishName, picture: allPath });

    const curCategory = await Category.findById(categoryes);
    curCategory.animals.push(newAnimal._id);
    await curCategory.save();
    // console.log(curCategory);
    // console.log(allPath);

    res.status(200).send('Ok');
  });

router.post('/addCategory', upload.single('filedata'), async (req, res) => {
  console.log('========req.file', req.file);
  const { title, englishName, description } = req.body;
  const newCategory = await Category.create({
    title,
    englishName,
    description,
    animals: [],
    picture: req.file.path.slice(6),
  });
  console.log(newCategory);
  res.redirect('/admin/categories?categoryAdded=1');
});

module.exports = router;
