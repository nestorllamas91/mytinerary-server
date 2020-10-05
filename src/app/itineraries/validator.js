import { body } from 'express-validator';

export default [
  body('cityId')
    .notEmpty()
    .withMessage('The city is required.')
    .isInt()
    .withMessage('The city must be an integer (ID of the city).'),
  body('countryId')
    .notEmpty()
    .withMessage('The country is required.')
    .isInt()
    .withMessage('The country must be an integer (ID of the country).'),
  body('userId')
    .notEmpty()
    .withMessage('The user is required.')
    .isInt()
    .withMessage('The user must be an integer (ID of the user).'),
  body('title')
    .notEmpty()
    .withMessage('The title of the itinerary is required.')
    .isString()
    .withMessage('The title of the itinerary must be a string.')
    .isLength({ max: 50 })
    .withMessage('The title of the activity must have a maximum length of 50 characters.'),
  body('rating')
    .notEmpty()
    .withMessage('The rating of the itinerary is required.')
    .isFloat({ min: 0.0, max: 5.0 })
    .withMessage('The rating of the itinerary must be a floating-point number with 1 decimal from 0.0 to 5.0.')
    .isDecimal({ decimal_digits: '1' })
    .withMessage('The rating of the itinerary must be a floating-point number with 1 decimal from 0.0 to 5.0.'),
  body('duration')
    .notEmpty()
    .withMessage('The duration of the itinerary is required.')
    .isInt({ min: 1, max: 7 })
    .withMessage('The duration of the itinerary must be an integer and represented in days from 1 to 7.'),
  body('price')
    .notEmpty()
    .withMessage('The price of the itinerary is required.')
    .isString()
    .withMessage('The price of the itinerary must be a string.')
    .matches(/$|$$|$$$/)
    .withMessage('The price of the itinerary must be represented symbolically as "$", "$$", or "$$$".'),
  body('hashtags')
    .notEmpty()
    .withMessage('The hashtags of the itinerary are required.')
    .isArray({ max: 3 })
    .withMessage(
      'The hashtags of the itinerary must be an array of maximum 3 strings and each one has to be sent without the prefix symbol "#".'
    )
];
