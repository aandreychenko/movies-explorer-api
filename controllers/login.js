const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { UnauthorizedErr, BadRequestErr } = require('../errors/index');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new BadRequestErr('Не передан email или пароль');
  }

  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }
          const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');

          return res.send({ id: user._id, token });
        })
        .catch(() => {
          throw new UnauthorizedErr('Неправильные почта или пароль');
        });
    })
    .catch(() => {
      throw new UnauthorizedErr('Неправильные почта или пароль');
    })
    .catch(next);
};
