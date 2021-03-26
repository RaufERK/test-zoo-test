const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const morgan = require('morgan');
const MongoStore = require('connect-mongo');
const path = require('path');
const { cookiesCleaner } = require('./auth');
const { DB_PATH, MOCK_DB } = process.env;
// const upload = require('./multer');

const hbs = require('hbs');

hbs.registerHelper('ifCond', function (v1, v2, options) {
  if (v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});

module.exports = function (app) {
  // app.use(morgan('dev'));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cookieParser());

  app.use(
    session({
      secret: 'keyboard cat',
      resave: true,
      saveUninitialized: false,
      cookie: { secure: false, maxAge: 60000000 },
      store: MongoStore.create({ mongoUrl: DB_PATH }),
    })
  );

  app.use(cookiesCleaner);

  // middleware for transfering sessions to all hbs
  app.use((req, res, next) => {
    res.locals.login = req.session.login;
    // res.locals.userId = req.session.login;
    next();
  });

  // app.use(upload.any());

  app.use(cookiesCleaner);

  // Подключаем статику
  app.use(express.static(path.join(__dirname, '..', 'public')));

  // Подключаем views(hbs)
  app.set('views', path.join(__dirname, '..', 'views'));
  app.set('view engine', 'hbs');
};
