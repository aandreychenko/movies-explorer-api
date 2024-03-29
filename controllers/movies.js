/* import modules */
const Movie = require('../models/Movie');
const { NotFoundErr, BadRequestErr, ForbiddenErr } = require('../errors/index');

/* define controllers for processing movie requests */
module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => {
      if (!movies) {
        throw new NotFoundErr('Фильмы не найдены');
      } else {
        res.send(movies);
      }
    })
    .catch(next);
};

module.exports.postMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: req.user._id,
  })
    .then((movie) => res.send({
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: movie.image,
      trailer: movie.trailer,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
      thumbnail: movie.thumbnail,
      movieId: movie.movieId,
      owner: req.user._id,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestErr(`${Object.values(err.errors).map((error) => error.message).join(', ')}`));
      }
      if (err.kind === 'ObjectId') {
        throw new BadRequestErr(`${Object.values(err.errors).map((error) => error.message).join(', ')}`);
      }

      throw err;
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  Movie.findById(req.params.movieId)
    .orFail(() => {
      throw new NotFoundErr('Фильм не найден');
    })
    .then((movie) => {
      if (movie.owner.toString() === req.user._id) {
        movie.remove()
          .then(() => {
            res.send({
              country: movie.country,
              director: movie.director,
              duration: movie.duration,
              year: movie.year,
              description: movie.description,
              image: movie.image,
              trailer: movie.trailer,
              nameRU: movie.nameRU,
              nameEN: movie.nameEN,
              thumbnail: movie.thumbnail,
              movieId: movie.movieId,
              owner: req.user._id,
            });
          })
          .catch((err) => {
            if (err.kind === 'ObjectId') {
              throw new BadRequestErr(`${Object.values(err.errors).map((error) => error.message).join(', ')}`);
            }
            throw err;
          });
      } else {
        throw new ForbiddenErr('Нельзя удалить чужой фильм');
      }
    })
    .catch(next);
};
