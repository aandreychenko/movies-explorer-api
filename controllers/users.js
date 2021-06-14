/* import modules */
const User = require('../models/User');
const { NotFoundErr, BadRequestErr } = require('../errors/index');

/* define controllers for processing user requests */
module.exports.getUserInfo = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundErr('Пользователь не найден');
    })
    .then((user) => res.send({
      name: user.name,
      email: user.email,
      _id: user._id,
    }))
    .catch(next);
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFoundErr('Пользователь не найден');
    })
    .then((user) => res.send({
      name: user.name,
      email: user.email,
      _id: user._id,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestErr(`${Object.values(err.errors).map((error) => error.message).join(', ')}`);
      }

      throw err;
    })
    .catch(next);
};
