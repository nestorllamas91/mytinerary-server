import { body } from 'express-validator';

export const validatorUser = [
  body('data.*.countryId')
    .notEmpty()
    .withMessage('The country is required.')
    .isInt()
    .withMessage('The country must be an integer (ID of the country).'),
  body('data.*.username')
    .notEmpty()
    .withMessage('The username is required.')
    .isString()
    .withMessage('The username must be a string.')
    .isLength({ max: 20 })
    .withMessage('The username must have a maximum length of 20 characters.'),
  body('data.*.password')
    .notEmpty()
    .withMessage('The password is required.')
    .isLength({ min: 8 })
    .withMessage('The password must have a minimum length of 8 characters.'),
  body('data.*.email')
    .notEmpty()
    .withMessage('The email address is required.')
    .isEmail()
    .withMessage('The email address must be a string in a valid email address format.'),
  body('data.*.name.*.first')
    .notEmpty()
    .withMessage('The first name is required.')
    .isString()
    .withMessage('The first name must be a string.')
    .isLength({ max: 30 })
    .withMessage('The first name must have a maximum length of 30 characters.'),
  body('data.*.name.*.last')
    .notEmpty()
    .withMessage('The last name is required.')
    .isString()
    .withMessage('The last name must be a string.')
    .isLength({ max: 30 })
    .withMessage('The last name must have a maximum length of 30 characters.')
];

export const validatorUserLogin = [
  body('username')
    .notEmpty()
    .withMessage('The username is required.')
    .isString()
    .withMessage('The username must be a string.')
    .isLength({ max: 20 })
    .withMessage('The username must have a maximum length of 20 characters.'),
  body('password')
    .notEmpty()
    .withMessage('The password is required.')
    .isLength({ min: 8 })
    .withMessage('The password must have a minimum length of 8 characters.')
];
