const User = require('../models/User');
const { NotFoundErr, BadRequestErr } = require('../errors/index');

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
    .catch((err) => {
      next(err);
    });
};

module.exports.updateUserInfo = (req, res, next) => {
  const { name } = req.body;

  User.findByIdAndUpdate(req.user._id, { name }, { new: true, runValidators: true })
    .orFail(() => {
      throw new NotFoundErr('Пользователь не найден');
    })
    .then((user) => res.send({
      name: user.name,
      _id: user._id,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestErr(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
      }

      next(err);
    });
};
