const router = require('express').Router();

const Animal = require('../models/animals.model');
const Category = require('../models/category.model');
const upload = require('../middleware/multer');

router
  .route('/')
  .get(async (req, res) => {
    const categoty = await Category.find();
    const animals = await Animal.find();
    const animalsWithCategory = animals.map(({ _id, name, englishName }) => {
      const curCategory = categoty.find((el) => el.animals.includes(_id));
      return {
        _id,
        name,
        englishName,
        titleCategory: curCategory.title,
      };
    });
    res.render('admin/adminPage', {
      title: 'Административная часть',
      categoty,
      animalsWithCategory,
    });
  })
  // Подключаем multer для routе '/admin'
  .post(upload.any('filedata'), async (req, res) => {
    const { name, description, englishName, categoryes } = req.body;

    const allPath = req.files.map((el) => el.path.slice(6));
    const newAnimal = await Animal.create({
      name,
      description,
      englishName,
      picture: allPath,
    });

    const curCategory = await Category.findById(categoryes);
    curCategory.animals.push(newAnimal._id);
    await curCategory.save();
    // console.log(curCategory);
    // console.log(allPath);
      // res.redirect(`/animals/${englishName}`);
    res.status(200).send('Ok')
  });

router
  .route('/animals/edit/:id')
  .get(async (req, res) => {
    const { id } = req.params;
    const animal = await Animal.findById(id);
    const category = await Category.find();
    const curCategory = category.find((el) => el.animals.includes(id));

    const editCategory = category.map(({ _id, title }) => {
      return {
        _id,
        title,
        selected: title === curCategory.title ? true : false,
      };
    });

    res.render('admin/editAnimals', {
      animal,
      editCategory,
      curCategory,
    });
  })
  .post(async (req, res) => {
    const { id } = req.params;
    const { name, englishName, categoryes, description } = req.body;

    const categoty = await Category.find();
    const curCategory = categoty.find((el) => el.animals.includes(id));

    // Блок при условии что категория не изменилась
    if (curCategory._id == categoryes) {
      const animal = await Animal.findById(id);
      animal.name = name;
      animal.englishName = englishName;
      animal.description = description;
      await animal.save();
      return res.redirect('/admin');
    }

    // Блок при условии что категория изменилась

    // curCategory.animals
  });

module.exports = router;
