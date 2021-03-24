const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const morgan = require('morgan');
const MongoStore = require('connect-mongo');
const path = require('path');
const { cookiesCleaner } = require('./auth');
const { DB_PATH, MOCK_DB } = process.env;

module.exports = function (app) {

  app.use(morgan('dev'));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  app.use(
    session({
      secret: 'keyboard cat',
      resave: true,
      saveUninitialized: false,
      cookie: { secure: false, maxAge: 60000000 },
      store: MongoStore.create({ mongoUrl: MOCK_DB }),
    })
  );

  app.use(cookiesCleaner);

  // middleware for transfering sessions to all hbs
  app.use((req, res, next) => {
    res.locals.login = req.session.login;
    // res.locals.userId = req.session.login;
    next();
  });

  app.use(cookiesCleaner);

  // Подключаем статику
  app.use(express.static(path.join(__dirname, '..', 'public')));

  // Подключаем views(hbs)
  app.set('views', path.join(__dirname, '..', 'views'));
  app.set('view engine', 'hbs');
};
