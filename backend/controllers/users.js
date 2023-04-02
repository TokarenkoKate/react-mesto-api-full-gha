const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const NotFoundError = require('../errors/not-found-err');
const IncorrectDataError = require('../errors/incorrect-data-err');
const UserExistsError = require('../errors/user-exists-err');
const IncorrectAuthDataError = require('../errors/incorrect-auth-data-err');
const User = require('../models/user');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(next);
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId).exec()
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new IncorrectDataError('Некорректный _id пользователя'));
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      name, about, avatar, email, password: hash,
    }))
    .then((user) => res.send({
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        email: user.email,
      }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new UserExistsError('Пользователь с таким email уже существует.'));
      } else if (err.name === 'ValidationError') {
        next(new IncorrectDataError('Некорректные данные при создании карточки.'));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email }).select('+password')
    .orFail(() => {
      next(new IncorrectAuthDataError('Передан неверный логин или пароль'));
    })
    .then((user) => bcrypt.compare(password, user.password).then((matched) => {
      if (matched) {
        return user;
      }
      return next(new IncorrectAuthDataError('Передан неверный логин или пароль'));
    }))
    .then((user) => {
      const token = jwt.sign({ _id: user.id }, 'super-strong-secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectDataError('Некорректные данные при создании карточки.'));
      } else {
        next(err);
      }
    });
};

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectDataError('Некорректные данные при создании карточки.'));
      } else {
        next(err);
      }
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectDataError('Некорректные данные при создании карточки.'));
      } else {
        next(err);
      }
    });
};

// GET /users/me
module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      next(new NotFoundError('Пользователь не найден.'));
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new IncorrectDataError('Некорректные данные при создании карточки.'));
      } else {
        next(err);
      }
    });
};
