const express = require('express');
const { validateUserUpdate } = require('../middlewares/validate');

const userRouter = express.Router();
const { getUserInfo, updateUserInfo } = require('../controllers/users');

userRouter.get('/me', getUserInfo);
userRouter.patch('/me', validateUserUpdate, updateUserInfo);

module.exports = userRouter;
