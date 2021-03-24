const express = require('express');
const bcrypt = require('bcrypt');
const { sessionChecker } = require('../middleware/auth');
const User = require('../models/user.model');

const saltRounds = 10;
const router = express.Router();

router.get('/register', (req, res) => {
  res.render('auth/register', { title: 'Sign up' });
});

router.post('/register', async (req, res) => {
  const { email, userName, password } = req.body;
  let userFound;

  userFound = await User.findOne({ email });

  if (!userFound) {
    // adding user
    const passwordHash = await bcrypt.hash(password, saltRounds);
    userFound = await User.create({ email, userName, password: passwordHash });
    req.session.login = email;
    req.session.userId = userFound._id;
    return res.sendStatus(200).json();
  }
  // user already exists
  return res.status(500).send('User already exists!');
});

router.get('/login', (req, res) => {
  res.render('auth/login', { title: 'Log in' });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  // проверяем, есть ли пользователь
  const userFound = await User.findOne({ email });

  if (!userFound) {
    return res.status(500).send('No such user!');
  }

  const passwordsMatch = await bcrypt.compare(password, userFound.password);

  // чекаем верен ли введенный пароль
  if (!passwordsMatch) {
    return res.status(500).send('Incorrect Password!');
  }

  // авторизуем

  req.session.login = email;
  req.session.userId = userFound._id;
  res.redirect('/admin')
  return res.status(200).json();
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/login');
});

router.get('/profile', sessionChecker, (req, res) => {
  res.render('profile');
});

module.exports = router;
