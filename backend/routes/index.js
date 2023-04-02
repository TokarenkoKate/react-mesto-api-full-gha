const { celebrate, Joi } = require('celebrate');
const router = require('express').Router();
const { createUser, login } = require('../controllers/users');
const userRouter = require('./users');
const cardsRouter = require('./cards');
const invalidRouter = require('./invalidRoutes');
const auth = require('../middlewares/auth');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/^http(s)?:\/\/[\w\-._~:/?#[\]@!$&'()*+,;=]+\.[a-z]{2,4}([/\w])*(#)*/),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

router.use(auth);

router.use('/users', userRouter);

router.use('/cards', cardsRouter);

router.use('*', invalidRouter);

module.exports = router;
