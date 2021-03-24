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
    
    const allPath = req.files.map((el) => el.path);
    const newAnimal = await Animal.create({ name, description, englishName, picture: allPath });

    const curCategory = await Category.findById(categoryes);
    curCategory.animals.push(newAnimal._id);
    await curCategory.save()
    // console.log(curCategory);
    // console.log(allPath);

    res.status(200).send('Ok');
  });

router.post('/addCategory', async (req, res) => {
  const newCategory = await Category.create(req.body);
  console.log(newCategory);
});

module.exports = router;
