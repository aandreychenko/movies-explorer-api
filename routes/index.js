const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const { auth } = require('../middlewares/auth');
const { login } = require('../controllers/login');
const { createUser } = require('../controllers/createUser');
const { validateAuthentication, validateUserRegistration } = require('../middlewares/validate');
const { NotFoundErr } = require('../errors/index');

/* use routes for requests */
router.post('/signin', validateAuthentication, login);
router.post('/signup', validateUserRegistration, createUser);

router.use(auth);
router.use('/users', userRouter);
router.use('/movies', movieRouter);

/* process not defined routes */
router.use('*', () => {
  throw new NotFoundErr('Ресурс не найден');
});

module.exports = router;
