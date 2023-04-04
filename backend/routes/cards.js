const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const requestsValidation = require('../requestsValidation/requestsValidation');

const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');

router.get('/', getCards);

router.post('/', celebrate({
  body: Joi.object().keys({
    name: requestsValidation.nameRequired,
    link: requestsValidation.link,
  }),
}), createCard);

router.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: requestsValidation.id,
  }),
}), deleteCard);

router.put('/:cardId?/likes', celebrate({
  params: Joi.object().keys({
    cardId: requestsValidation.id,
  }),
}), likeCard);

router.delete('/:cardId?/likes', celebrate({
  params: Joi.object().keys({
    cardId: requestsValidation.id,
  }),
}), dislikeCard);

module.exports = router;
