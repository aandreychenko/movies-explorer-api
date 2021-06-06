const bcrypt = require('bcrypt');
const User = require('../models/User');
const { BadRequestErr, RegistrationErr } = require('../errors/index');

module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;

  if (!email || !password) {
    throw new BadRequestErr('Не передан email или пароль');
  }

  return bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name,
        email,
        password: hash,
      })
        .then(() => {
          res.status(200).send({ message: 'Пользователь создан' });
        })
        .catch((err) => {
          if (err.code === 11000) {
            throw new RegistrationErr('Пользователь с такой почтой уже существует');
          }
          if (err.name === 'ValidationError') {
            throw new BadRequestErr(`${Object.values(err.errors).map((error) => error.message).join(', ')}`);
          }
          if (err.kind === 'ObjectId') {
            throw new BadRequestErr('Введены некорректные данные');
          }
        })
        .catch(next);
    });
};
