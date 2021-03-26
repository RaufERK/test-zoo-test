const router = require('express').Router();
const fs = require('fs').promises;

const Animal = require('../models/animals.model');
const Category = require('../models/category.model');
const upload = require('../middleware/multer');

router
  .route('/')
  .get(async (req, res) => {
    const { error_message } = req.query;
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
      error_message,
    });
  })
  // Подключаем multer для routе '/admin'
  .post(upload.any('filedata'), async (req, res) => {
    const { name, description, englishName, categoryes } = req.body;

    const allPath = req.files.map((el) => el.path.slice(6));
    let newAnimal;
    try {
      newAnimal = await Animal.create({
        name,
        description,
        englishName,
        picture: allPath,
      });
    } catch (error) {
      console.log(error.message);
      const errorMessage = error.message.includes(`name: "${name}"`) ? `Животное с именем ${name} уже создано` : `Животное с именем ${englishName} уже создано`
      return res
        .status(500)
        .redirect(`/admin?error_message=${errorMessage}`);
    }

    const curCategory = await Category.findById(categoryes);
    curCategory.animals.push(newAnimal._id);
    await curCategory.save();
    // console.log(curCategory);
    // console.log(allPath);
    // res.redirect(`/animals/${englishName}`);
    res.status(200).redirect('/admin');
  });

router.get('/animals/edit/:id');

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

      // Блок при условии что категория не изменилась
      if (curCategory._id == categoryes) {
        return res.redirect('/admin');
      }

      // Блок при условии что категория изменилась

      // Удаляем животное из текущей категории
      const newArray = curCategory.animals.filter((el) => el._id != id);
      curCategory.animals = newArray;
      await curCategory.save();

      const newCategory = await Category.findById(categoryes);
      newCategory.animals.push(animal);
      await newCategory.save();
      res.status(200).redirect('/admin');
    }
  });

router.post(
  '/animals/add-pic/:id',
  upload.any('filedata'),
  async (req, res) => {
    const { id } = req.params;
    const allPath = req.files.map((el) => el.path.slice(6));
    console.log(allPath);

    const animal = await Animal.findById(id);
    animal.picture = [...animal.picture, ...allPath];
    try {
      await animal.save();
      res.status(200).redirect(`/admin/animals/edit/${id}`)
    } catch (error) {
      res.sendStatus(200);
    }
  }
);

// Удаление картинки животного

router.get('/animals/delete/image/:id', async (req, res) => {
  const { id } = req.params;
  const { srcDel } = req.query;

  const animal = await Animal.findById(id);
  animal.picture = animal.picture.filter((el) => el !== `/${srcDel}`);

  try {
    await animal.save();
    await fs.rm(`public/${srcDel}`);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
});

// Удаление животного

router.get('/animals/delete/:id', async (req, res) => {
  try {
    await Animal.findByIdAndDelete(req.params.id);
    res.redirect('/admin');
  } catch (error) {
    res.status(500).redirect('/');
  }
});

module.exports = router;
