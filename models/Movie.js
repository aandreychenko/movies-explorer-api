const validator = require('validator');
const mongoose = require('mongoose');

/* define movie schema for mongo database */
const MovieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, 'Введите страну производителя фильма'],
  },
  director: {
    type: String,
    required: [true, 'Введите имя режиссера фильма'],
  },
  duration: {
    type: Number,
    required: [true, 'Введите продолжительность фильма'],
  },
  year: {
    type: String,
    required: [true, 'Введите год выпуска фильма'],
  },
  description: {
    type: String,
    required: [true, 'Введите описание фильма'],
  },
  image: {
    type: String,
    required: [true, 'Введите ссылку на постер к фильму'],
    validate: {
      validator: (url) => validator.isURL(url),
      message: 'Ссылка на постер к фильму должна быть url-адресом',
    },
  },
  trailer: {
    type: String,
    required: [true, 'Введите ссылку на трейлер к фильму'],
    validate: {
      validator: (url) => validator.isURL(url),
      message: 'Ссылка на трейлер к фильму должна быть url-адресом',
    },
  },
  thumbnail: {
    type: String,
    required: [true, 'Введите ссылку на миниатюру постера к фильму'],
    validate: {
      validator: (url) => validator.isURL(url),
      message: 'Ссылка на миниатюру постера к фильму должна быть url-адресом',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Введите аккаунт пользователя, загрузившего фильм'],
    default: '',
  },
  movieId: {
    type: Number,
    required: [true, 'Введите id фильма'],
  },
  nameRU: {
    type: String,
    required: [true, 'Введите название фильма на русском языке'],
  },
  nameEN: {
    type: String,
    required: [true, 'Введите название фильма на английском языке'],
  },
});

/* make model for js and mongo interacting */
module.exports = mongoose.model('Movie', MovieSchema);
