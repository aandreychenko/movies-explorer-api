/* CREATE SERVER */
/* import modules and configs */
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const { errors } = require('celebrate');
const helmet = require('helmet');
const cors = require('cors');
const routes = require('./routes');
const limiter = require('./middlewares/limiter');
const errorHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

/* define constants */
const { PORT = 3000 } = process.env;
const { NODE_ENV, MONGODB } = process.env;

const app = express();

/* connect with database */
mongoose.connect(NODE_ENV === 'production' ? MONGODB : 'mongodb://localhost:27017/test', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

/* do request logs */
app.use(requestLogger);

/* use request limiter */
app.use(limiter);

/* use helmet for security */
app.use(helmet());

/* use json in requests */
app.use(express.json());

/* allow cors */
app.use(cors());

/* use routes */
app.use(routes);

/* carry errors */
app.use(errorLogger); /* do error logs */
app.use(errors()); /* use celebrate for validating requests */
app.use(errorHandler); /* use centralised error processing */

/* start server */
app.listen(PORT, () => {
});
