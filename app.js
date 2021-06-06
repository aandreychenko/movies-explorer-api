/* CREATE SERVER */
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const userRouter = require('./routes/users');
const movieRouter = require('./routes/movies');
const { login } = require('./controllers/login');
const { createUser } = require('./controllers/createUser');
const { NotFoundErr } = require('./errors/index');

const { PORT = 3001 } = process.env;
const app = express();

/* connecting our database */
mongoose.connect('mongodb://localhost:27017/movieexpdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(express.json());

app.use('/users', /*  auth, */ userRouter);
app.use('/movies', /*  auth, */ movieRouter);

app.post('/signin', /* validateAuthentication, */ login);
app.post('/signup', /* validateUserRegistration, */ createUser);

app.use('*', () => {
  throw new NotFoundErr('Ресурс не найден');
});

app.listen(PORT, () => {
});
