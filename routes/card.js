// eslint-disable-next-line import/no-extraneous-dependencies
const router = require('express').Router();
// eslint-disable-next-line object-curly-newline
const { createCard, getCards, deleteCard, likeCard, dislikeCard } = require('../controllers/cards');

router.get('/cards', getCards);
router.delete('/cards/:cardsId', deleteCard);
router.post('/cards', createCard);
router.put('/cards/:cardId/likes', likeCard);
router.delete('/cards/:cardId/likes', dislikeCard);

module.exports = router;
