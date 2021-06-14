/* import modules */
const express = require('express');
const { validateUserUpdate } = require('../middlewares/validate');

/* define constants */
const userRouter = express.Router();
const { getUserInfo, updateUserInfo } = require('../controllers/users');

/* define movies routes */
userRouter.get('/me', getUserInfo);
userRouter.patch('/me', validateUserUpdate, updateUserInfo);

/* export movie routes */
module.exports = userRouter;
