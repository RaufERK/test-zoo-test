require('dotenv').config();
const express = require('express');

const useMiddleware = require('./middleware');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const animalRouter = require('./routes/animals');
const adminRouter = require('./routes/admin');
const tariffRouter = require('./routes/tariff');
const adminCategoriesRouter = require('./routes/adminCategories');

const { PORT } = process.env;
const connectDB = require('./db/mongo');
const useErrorHandlers = require('./middleware/error-handlers');

const app = express();
useMiddleware(app);

connectDB();

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/', animalRouter);
app.use('/admin', adminRouter);
app.use('/', tariffRouter);
app.use('/', adminCategoriesRouter);

useErrorHandlers(app);

app.listen(PORT || 3000, () => {
  console.log(`server started at port ${PORT}`.green);
});
