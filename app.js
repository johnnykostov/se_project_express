const { PORT = 3000 } = process.env;
const express = require('express');
const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost:27017/aroundb')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB', error);
  });

const app = express();
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const { NOT_FOUND } = require('./utils/errors');

app.use((req, res, next) => {
  req.user = {
    _id: '64e65fe89bc0ac118af5aff3',
  };

  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use((req, res) => {
  res
    .status(NOT_FOUND)
    .send({ message: 'The requested resource was not found' });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});