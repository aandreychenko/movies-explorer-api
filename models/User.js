const validator = require('validator');
const mongoose = require('mongoose');

/* define user schema for mongo database */
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Введите имя пользователя'],
    minlength: [2, 'Добавьте хотя бы одну букву к имени'],
    maxlength: [30, 'Сделайте имя покороче. Максимум — 30 букв'],
  },
  email: {
    type: String,
    required: [true, 'Укажите вашу электронную почту'],
    unique: [true, 'Пользователь с этой почтой уже зарегистрирован'],
    validate: {
      validator: (email) => validator.isEmail(email),
      message: 'Укажите адрес почты в формате: email@host.ru',
    },
  },
  password: {
    type: String,
    required: [true, 'Придумайте пароль'],
    minlength: [8, 'Придумайте пароль длиннее 8 символов, так безопаснее'],
    select: false,
  },
});

/* make model for js and mongo interacting */
module.exports = mongoose.model('User', UserSchema);
