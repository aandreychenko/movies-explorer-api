const express = require('express');
const { validateObjId, validateMovieBody } = require('../middlewares/validate');

const movieRouter = express.Router();
const { getMovies, postMovie, deleteMovie } = require('../controllers/movies');

movieRouter.get('/', getMovies);
movieRouter.post('/', validateMovieBody, postMovie);
movieRouter.delete('/movieId', validateObjId, deleteMovie);

module.exports = movieRouter;
