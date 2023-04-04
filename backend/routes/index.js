const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const { createUser, login } = require('../controllers/users');
const userRouter = require('./users');
const cardsRouter = require('./cards');
const invalidRouter = require('./invalidRoutes');
const auth = require('../middlewares/auth');
const requestsValidation = require('../requestsValidation/requestsValidation');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: requestsValidation.name,
    about: requestsValidation.about,
    avatar: requestsValidation.link,
    email: requestsValidation.email,
    password: requestsValidation.password,
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: requestsValidation.email,
    password: requestsValidation.password,
  }),
}), login);

router.use(auth);

router.use('/users', userRouter);

router.use('/cards', cardsRouter);

router.use('*', invalidRouter);

module.exports = router;
