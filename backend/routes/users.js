const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const requestsValidation = require('../requestsValidation/requestsValidation');

const {
  getUsers, getUser, updateProfile, updateAvatar, getCurrentUser,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', getCurrentUser);

router.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: requestsValidation.id,
  }),
}), getUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: requestsValidation.nameRequired,
    about: requestsValidation.aboutRequired,
  }),
}), updateProfile);

router.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: requestsValidation.requiredLink,
  }),
}), updateAvatar);

module.exports = router;
