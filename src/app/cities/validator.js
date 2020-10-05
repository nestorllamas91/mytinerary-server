import { body } from 'express-validator';

export default [
  body('countryId')
    .notEmpty()
    .withMessage('The country is required.')
    .isInt()
    .withMessage('The country must be an integer (ID of the country).'),
  body('name')
    .notEmpty()
    .withMessage('The name of the city is required.')
    .isString()
    .withMessage('The name of the city must be a string.')
    .isLength({ max: 40 })
    .withMessage('The name of the city must have a maximum length of 40 characters.')
];
