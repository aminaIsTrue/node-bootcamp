const express = require('express');
const morgan = require('morgan');
const { json } = require('express');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const app = express();
app.use(express.json());
// use a third party middleware
app.use(morgan('dev'));
// create our own middleware
app.use((req, res, next) => {
  console.log('Hello from my first created middleware💃 ');
  next();
});

// create an actual midleware to manipulate the request
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// this is a middleware
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
