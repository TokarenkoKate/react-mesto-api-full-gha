const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();

const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(/^http(s)?:\/\/[\w\-._~:/?#[\]@!$&'()*+,;=]+\.[a-z]{2,4}([/\w])*(#)*/),
  }),
}), createCard);

router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), deleteCard);

router.put('/:cardId?/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), likeCard);

router.delete('/:cardId?/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().length(24).hex().required(),
  }),
}), dislikeCard);

module.exports = router;
