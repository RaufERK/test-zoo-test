require('dotenv').config();
const express = require('express');
const hbs = require('hbs');

const { sessionChecker } = require('./middleware/auth');

const useMiddleware = require('./middleware');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const animalRouter = require('./routes/animals');
const adminRouter = require('./routes/admin');
const tariffRouter = require('./routes/tariff');
const adminCategoriesRouter = require('./routes/adminCategories');
const mapRouter = require('./routes/map');

const { PORT } = process.env;
const connectDB = require('./db/mongo');
const useErrorHandlers = require('./middleware/error-handlers');

const app = express();

useMiddleware(app);
hbs.registerPartials(__dirname + '/views/partials', function (err) {});

connectDB();

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/', animalRouter);
app.use('/', tariffRouter);
app.use('/', mapRouter);
app.use('/', adminCategoriesRouter);

app.use(sessionChecker);
app.use('/admin', adminRouter);

useErrorHandlers(app);

app.listen(PORT || 3000, () => {
  console.log(`server started at port ${PORT}`.green);
});
