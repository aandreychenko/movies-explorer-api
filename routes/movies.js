const express = require('express');

const movieRouter = express.Router();
const { getMovies, postMovie, deleteMovie } = require('../controllers/movies');

movieRouter.get('/', getMovies);
movieRouter.post('/', postMovie);
movieRouter.delete('/movieId', deleteMovie);

module.exports = movieRouter;
