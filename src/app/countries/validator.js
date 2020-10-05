import { body } from 'express-validator';

export default [
  body('shortName')
    .notEmpty()
    .withMessage('The short name of the country is required.')
    .isString()
    .withMessage('The short name of the country must be a string.')
    .isLength({ max: 40 })
    .withMessage('The short name of the country must have a maximum length of 40 characters.'),
  body('fullName')
    .notEmpty()
    .withMessage('The full name of the country is required.')
    .isString()
    .withMessage('The full name of the country must be a string.')
    .isLength({ max: 60 })
    .withMessage('The full name of the country must have a maximum length of 60 characters.'),
  body('continent')
    .notEmpty()
    .withMessage('The continent of the country is required.')
    .isString()
    .withMessage('The continent of the country must be a string.')
    .isLength({ max: 20 })
    .withMessage('The continent of the country must have a maximum length of 20 characters.')
];
