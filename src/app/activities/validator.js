import { body } from 'express-validator';

export default [
  body('itineraryId')
    .notEmpty()
    .withMessage('The itinerary is required.')
    .isInt()
    .withMessage('The itinerary must be an integer (ID of the itinerary).'),
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
  body('title')
    .notEmpty()
    .withMessage('The title of the activity is required.')
    .isString()
    .withMessage('The title of the activity must be a string.')
    .isLength({ max: 50 })
    .withMessage('The title of the activity must have a maximum length of 50 characters.'),
  body('description')
    .notEmpty()
    .withMessage('The description of the activity is required.')
    .isString()
    .withMessage('The description of the activity must be a string.')
    .isLength({ max: 500 })
    .withMessage('The description of the activity must have a maximum length of 500 characters.')
];
