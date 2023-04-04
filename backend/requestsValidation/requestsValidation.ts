const { Joi } = require('celebrate');

const requestsValidation = {
  name: Joi.string().min(2).max(30),
  nameRequired: Joi.string().required().min(2).max(30),
  about: Joi.string().min(2).max(30),
  aboutRequired: Joi.string().required().min(2).max(30),
  link: Joi.string().pattern(/^http(s)?:\/\/[\w\-._~:/?#[\]@!$&'()*+,;=]+\.[a-z]{2,4}([/\w])*(#)*/),
  requiredLink: Joi.string().pattern(/^http(s)?:\/\/[\w\-._~:/?#[\]@!$&'()*+,;=]+\.[a-z]{2,4}([/\w])*(#)*/),
  id: Joi.string().length(24).hex().required(),
  email: Joi.string().required().email(),
  password: Joi.string().required(),
};

module.exports(requestsValidation);
