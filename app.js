const express = require('express');

const { celebrate, Joi, errors } = require('celebrate');

const { PORT = 3000 } = process.env;

const mongoose = require('mongoose');

const userRouter = require('./routes/user');

const cardRouter = require('./routes/card');

const {
  createUser, login,
} = require('./controllers/users');

const auth = require('./middlewares/auth');

const NotFoundError = require('./errors/not-found-error');

const AllErrors = require('./middlewares/all-errors');

// подключаемся к серверу mongo
mongoose.connect('mongodb://localhost:27017/mestodb');

const app = express();

app.use(express.json());

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/^((http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\\/])*)?/),
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

app.use(auth, userRouter);
app.use(auth, cardRouter);
app.use('*', (req, res, next) => {
  res.send(next(new NotFoundError(`Страницы по адресу ${req.baseUrl} не существует`)));
});
app.use(errors());

app.use(AllErrors);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}`);
});
