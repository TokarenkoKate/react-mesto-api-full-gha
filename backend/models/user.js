const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minLength: [2, 'Имя пользователя должно содержать минимум 2 символа.'],
    maxLength: [30, 'Имя пользователя должно содержать максимум 30 символов.'],
  },
  about: {
    type: String,
    default: 'Исследователь',
    minLength: [2, 'Информация о пользователе должна содержать минимум 2 символа.'],
    maxLength: [30, 'Информация о пользователе должна содержать максимум 30 символов.'],
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator(v) {
        return validator.isURL(v);
      },
      message: 'Некорректный URL изображения.',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: 'Некорректный email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

module.exports = mongoose.model('user', userSchema);
