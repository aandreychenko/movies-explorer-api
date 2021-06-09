/* CREATE SERVER */
/* import modules and configs */
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const { validateAuthentication, validateUserRegistration } = require('./middlewares/validate');
const errorHandler = require('./middlewares/error-handler');
const userRouter = require('./routes/users');
const movieRouter = require('./routes/movies');
const { login } = require('./controllers/login');
const { createUser } = require('./controllers/createUser');
const { auth } = require('./middlewares/auth');
const { NotFoundErr } = require('./errors/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

/* define constants */
const { PORT = 3000 } = process.env;
const { NODE_ENV, MONGODB } = process.env;
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 100,
});
const app = express();

/* connect with database */
mongoose.connect(NODE_ENV === 'production' ? MONGODB : 'mongodb://localhost:27017/movieexpdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

/* use request limiter */
app.use(limiter);

/* use json in requests */
app.use(express.json());

/* do request logs */
app.use(requestLogger);

/* use routes for requests */
app.use('/users', auth, userRouter);
app.use('/movies', auth, movieRouter);

app.post('/signin', validateAuthentication, login);
app.post('/signup', validateUserRegistration, createUser);

/* process not defined routes */
app.use('*', () => {
  throw new NotFoundErr('Ресурс не найден');
});

/* carry errors */
app.use(errorLogger); /* do error logs */
app.use(errors()); /* use celebrate for validating requests */
app.use(errorHandler); /* use centralised error processing */

/* start server */
app.listen(PORT, () => {
});
