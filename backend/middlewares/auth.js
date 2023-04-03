const jwt = require('jsonwebtoken');
const IncorrectAuthDataError = require('../errors/incorrect-auth-data-err');
const { NODE_ENV, JWT_SECRET } = process.env;

const extractBearerToken = (authorization) => authorization.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    next(new IncorrectAuthDataError('Необходима авторизация.'));
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev_secret');
  } catch (err) {
    next(new IncorrectAuthDataError('Необходима авторизация.'));
  }

  req.user = payload;

  next();
};
