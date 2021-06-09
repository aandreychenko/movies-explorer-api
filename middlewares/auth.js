/* import modules */
const jwt = require('jsonwebtoken');
const { UnauthorizedErr } = require('../errors/index');

/* define constants */
const { NODE_ENV, JWT_SECRET } = process.env;

/* make auth middleware */
module.exports.auth = (req, res, next) => {
  const { authorization } = req.headers;

  /* check if token starts with "Bearer" */
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedErr('Необходима авторизация');
  }

  /* cut off "Bearer" part */
  const token = authorization.replace('Bearer ', '');

  /* define payload */
  let payload;

  /* verify token */
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    throw new UnauthorizedErr('Необходима авторизация');
  }

  /* add payload to request */
  req.user = payload;

  next();
};
