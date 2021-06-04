/* CREATE SERVER */
require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');

const { PORT = 3001 } = process.env;
const app = express();

/* connecting our database */
mongoose.connect('mongodb://localhost:27017/movieexpdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});




app.listen(PORT, () => {
});
