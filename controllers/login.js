/* import modules */
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const { UnauthorizedErr, BadRequestErr } = require('../errors/index');

/* define constants */
const { NODE_ENV, JWT_SECRET } = process.env;

/* define controller for user logging in */
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  /* check if we got email and password */
  if (!email || !password) {
    throw new BadRequestErr('Не передан email или пароль');
  }

  /* search for user by email */
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Неправильные почта или пароль'));
      }

      /* check password by hash comparing */
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }
          /* generate token */
          const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
          /* send token */
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
