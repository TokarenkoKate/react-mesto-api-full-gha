const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const NotFoundError = require('../errors/not-found-err');
const IncorrectDataError = require('../errors/incorrect-data-err');
const UserExistsError = require('../errors/user-exists-err');
const IncorrectAuthDataError = require('../errors/incorrect-auth-data-err');
const User = require('../models/user');
const { NODE_ENV, JWT_SECRET } = require('../config');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((user) => res.send({ data: user }))
    .catch(next);
};

const getUserById = (req, res, next, id) => {
  return User.findById(id).exec()
    .then((user) => {
      if (user) {
        return res.send(user);
      } else {
        throw new NotFoundError('Пользователь по указанному _id не найден.');
      }
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(new IncorrectDataError('Некорректный _id пользователя'));
      } else {
        next(err);
      }
    });
};

module.exports.getUser = (req, res, next) => {
  return getUserById(req, res, next, req.params.userId);
};

module.exports.getCurrentUser = (req, res, next) => {
  return getUserById(req, res, next, req.user._id);
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
      } else if (err instanceof mongoose.Error.ValidationError) {
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
      const token = jwt.sign({ _id: user.id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev_secret', { expiresIn: '7d' });
      res.send({ token });
    })
    .catch(next);
};

const updateUserProfile = (req, res, next, data) => {
  return User.findByIdAndUpdate(req.user._id, data, {
    new: true,
    runValidators: true,
  })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new IncorrectDataError('Некорректные данные при создании карточки.'));
      } else {
        next(err);
      }
    });
}

module.exports.updateProfile = (req, res, next) => {
  const { name, about } = req.body;

  updateUserProfile(req, res, next, { name, about });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;

  updateUserProfile(req, res, next, { avatar });
};

