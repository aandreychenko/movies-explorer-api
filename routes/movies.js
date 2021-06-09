/* import modules */
const express = require('express');
const { validateObjId, validateMovieBody } = require('../middlewares/validate');

/* define constants */
const movieRouter = express.Router();
const { getMovies, postMovie, deleteMovie } = require('../controllers/movies');

/* define movies routes */
movieRouter.get('/', getMovies);
movieRouter.post('/', validateMovieBody, postMovie);
movieRouter.delete('/:movieId', validateObjId, deleteMovie);

/* export movie routes */
module.exports = movieRouter;
