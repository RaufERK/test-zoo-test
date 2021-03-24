require('dotenv').config();
const express = require('express');

const useMiddleware = require('./middleware');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const adminRouter = require('./routes/admin');

const { PORT } = process.env;
const connectDB = require('./db/mongo');
const useErrorHandlers = require('./middleware/error-handlers');

const app = express();
useMiddleware(app);

connectDB();

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/admin', adminRouter);

useErrorHandlers(app);

app.listen(PORT || 3000, () => {
  console.log(`server started at port ${PORT}`.green);
});
