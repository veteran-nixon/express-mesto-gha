const express = require('express');

const { PORT = 3000 } = process.env;

const mongoose = require('mongoose');

const { celebrate, Joi } = require('celebrate');

const userRouter = require('./routes/user');

const cardRouter = require('./routes/card');

const {
  createUser, login,
} = require('./controllers/users');

const auth = require('./middlewares/auth');

const NotFoundError = 404;

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb');

const app = express();

app.use(express.json());

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4),
  }),
}), createUser);
app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(4),
  }),
}), login);

app.use(auth);

app.use(userRouter);
app.use(cardRouter);
app.use('*', (req, res) => {
  res.status(NotFoundError).send({ message: `Страницы по адресу ${req.baseUrl} не существует` });
});
app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
  next();
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
