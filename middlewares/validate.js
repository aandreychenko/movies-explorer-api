/* import modules */
const { Joi, celebrate } = require('celebrate');
const { ObjectId } = require('mongoose').Types;
const validator = require('validator');

/* define valdation for different kind of requests */
const validateObjId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().custom((value, helpers) => {
      if (ObjectId.isValid(value)) {
        return value;
      }
      return helpers.message('Невалидный id');
    }),
  }),
});

const validateMovieBody = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required()
      .messages({
        'string.required': 'Поле "country" должно быть заполнено',
      }),
    director: Joi.string().required()
      .messages({
        'string.required': 'Поле "director" должно быть заполнено',
      }),
    duration: Joi.number().required()
      .messages({
        'number.required': 'Поле "duration" должно быть заполнено',
      }),
    year: Joi.string().required()
      .messages({
        'string.required': 'Поле "year" должно быть заполнено',
      }),
    description: Joi.string().required()
      .messages({
        'string.required': 'Поле "description" должно быть заполнено',
      }),
    image: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value, { require_protocol: true })) {
        return value;
      }
      return helpers.message('Поле "image" должно быть валидным url-адресом');
    })
      .messages({
        'any.required': 'Поле "image" должно быть заполнено',
      }),
    trailer: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value, { require_protocol: true })) {
        return value;
      }
      return helpers.message('Поле "trailer" должно быть валидным url-адресом');
    })
      .messages({
        'any.required': 'Поле "trailer" должно быть заполнено',
      }),
    nameRU: Joi.string().required()
      .messages({
        'string.required': 'Поле "nameRU" должно быть заполнено',
      }),
    nameEN: Joi.string().required()
      .messages({
        'string.required': 'Поле "nameEN" должно быть заполнено',
      }),
    thumbnail: Joi.string().required().custom((value, helpers) => {
      if (validator.isURL(value, { require_protocol: true })) {
        return value;
      }
      return helpers.message('Поле "thumbnail" должно быть валидным url-адресом');
    })
      .messages({
        'any.required': 'Поле "thumbnail" должно быть заполнено',
      }),
    movieId: Joi.number().required()
      .messages({
        'number.required': 'Поле "movieId" должно быть заполнено',
      }),
  }),
});

const validateUserRegistration = celebrate({
  body: Joi.object().keys({
    password: Joi.string().required().min(8)
      .messages({
        'string.min': 'Минимальная длина поля "password" - 8',
        'any.required': 'Поле "password" должно быть заполнено',
      }),
    email: Joi.string().required().email()
      .message('Поле "email" должно быть валидным email-адресом')
      .messages({
        'any.required': 'Поле "email" должно быть заполнено',
      }),
    name: Joi.string().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля "name" - 2',
        'string.max': 'Максимальная длина поля "name" - 30',
      }),
  }),
});

const validateUserUpdate = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Минимальная длина поля "name" - 2',
        'string.max': 'Максимальная длина поля "name" - 30',
        'any.required': 'Поле "name" должно быть заполнено',
      }),
    email: Joi.string().required().email()
      .message('Поле "email" должно быть валидным email-адресом')
      .messages({
        'string.required': 'Поле "email" должно быть заполнено',
      }),
  }),
});

const validateAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .message('Поле "email" должно быть валидным email-адресом')
      .messages({
        'string.required': 'Поле "email" должно быть заполнено',
      }),
    password: Joi.string().required().min(8)
      .messages({
        'string.min': 'Минимальная длина поля "password" - 8',
        'any.required': 'Поле "password" должно быть заполнено',
      }),
  }),
});

module.exports = {
  validateObjId,
  validateMovieBody,
  validateUserRegistration,
  validateUserUpdate,
  validateAuthentication,
};
