/* eslint-disable import/no-extraneous-dependencies */
const express = require('express');

const { PORT = 3000 } = process.env;
const mongoose = require('mongoose');
const userRouter = require('./routes/user');
const cardRouter = require('./routes/card');

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb');

const app = express();

app.use(express.json());
// временный id
app.use((req, res, next) => {
  req.user = {
    _id: '6264f71d1439b90e45508e51',
  };

  next();
});

app.use(userRouter);
app.use(cardRouter);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});