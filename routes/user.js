// eslint-disable-next-line import/no-extraneous-dependencies
const router = require('express').Router();
// eslint-disable-next-line object-curly-newline
const { createUser, getUser, getUsers, updateUser, updateAvatar } = require('../controllers/users');

router.get('/users', getUsers);
router.get('/users/:userId', getUser);
router.post('/users', createUser);
router.patch('/users/me', updateUser);
router.patch('/users/me/avatar', updateAvatar);
router.use('*', (req, res) => {
  res.status(400).send({ message: `Страницы по адресу ${req.baseUrl} не существует` });
});

module.exports = router;
