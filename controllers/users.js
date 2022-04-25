const User = require('../models/user');

const BadRequestError = 400;
const NotFoundError = 404;
const DefaultError = 500;

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(DefaultError).send({ message: 'Произошла ошибка' }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res.status(NotFoundError).send({ message: 'Пользователь по указанному _id не найден' });
      }
    })
    .catch(() => {
      if (res.status(BadRequestError)) {
        res.send({ message: 'Пользователь по указанному _id не найден' });
      }
      res.status(DefaultError).send({ message: 'Произошла ошибка' });
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch(() => {
      if (res.status(BadRequestError)) {
        res.send({ message: 'Переданы некорректные данные при создании пользователя' });
      }
      res.status(DefaultError).send({ message: 'Произошла ошибка' });
    });
};

module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch(() => {
      if (res.status(BadRequestError)) {
        res.send({ message: 'Переданы некорректные данные при обновлении профиля' });
      } else if (res.status(NotFoundError)) {
        res.send({ message: 'Пользователь по указанному _id не найден' });
      }
      res.status(DefaultError).send({ message: 'Произошла ошибка' });
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((user) => res.send(user))
    .catch(() => {
      if (res.status(BadRequestError)) {
        res.send({ message: 'Переданы некорректные данные при обновлении профиля' });
      } else if (res.status(NotFoundError)) {
        res.send({ message: 'Пользователь по указанному _id не найден' });
      }
      res.status(DefaultError).send({ message: 'Произошла ошибка' });
    });
};
