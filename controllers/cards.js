const Card = require('../models/card');

const BadRequestError = 400;
const NotFoundError = 404;
const DefaultError = 500;

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(DefaultError).send({ message: 'Произошла ошибка' }));
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.cardsId)
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        res.status(NotFoundError).send({ message: 'Карточка с таким _id не найдена' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BadRequestError).send({ message: 'Передан несуществующий _id карточки' });
      } else {
        res.status(DefaultError).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;

  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(BadRequestError).send({ message: 'Переданы некорректные данные при создании карточки' });
      } else {
        res.status(DefaultError).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $addToSet: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        res.status(NotFoundError).send({ message: 'Карточка с таким _id не найдена' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BadRequestError).send({ message: 'Переданы некорректные данные для постановки лайка' });
      } else {
        res.status(DefaultError).send({ message: 'Произошла ошибка' });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(req.params.cardId, { $pull: { likes: req.user._id } }, { new: true })
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        res.status(NotFoundError).send({ message: 'Карточка с таким _id не найдена' });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(BadRequestError).send({ message: 'Переданы некорректные данные для снятия лайка' });
      } else {
        res.status(DefaultError).send({ message: 'Произошла ошибка' });
      }
    });
};
