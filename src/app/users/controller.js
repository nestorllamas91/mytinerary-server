import User from '$server/app/users/model';

import { validationResult } from 'express-validator';
import { handleResponseSuccess } from '$server/app/_utils/http-responses/handlers';
import { HandlerResponseError } from '$server/app/_utils/http-responses/handlers';
import resStatuses from '$server/app/_utils/http-responses/statuses';
import resMessages from '$server/app/_utils/http-responses/messages';
import pify from 'pify';
import multer from 'multer';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const path = __filename;

const upload = pify(
  multer({
    storage: multer.diskStorage({
      destination: (req, file, callback) => {
        const pathUploads = path.resolve(__dirname, '../../../../client/public/uploads/profiles');
        callback(null, path);
      },
      filename: async (req, file, callback) => {
        const lastUser = await User.find({}).sort({ userId: -1 }).limit(1);
        const userId = lastUser.length !== 0 ? lastUser[0].userId + 1 : 1;
        const filename = `${userId}.jpg`;
        callback(null, filename);
      }
    })
  }).single('photo')
);

export async function createUser(req, res, next) {
  const origin = { functionName: 'createUser()', path };
  try {
    await upload(req, res);
    const data = JSON.parse(req.body.data);
    req.body.data = data;
    const errorsValidation = validationResult(req);
    if (!errorsValidation.isEmpty()) {
      return next(
        new HandlerResponseError(
          origin,
          resStatuses.UNPROCESSABLE_ENTITY,
          resMessages.USER_UNPROCESSABLE,
          errorsValidation.array(),
          undefined
        )
      );
    }
    const countryId = Number(req.body.data.countryId);
    const username = req.body.data.username;
    const password = req.body.data.password;
    const email = req.body.data.email;
    const name = req.body.data.name;
    const existentUserByUsername = await User.findOne({ username });
    const existentUserByEmail = await User.findOne({ email });
    if (!existentUserByUsername && !existentUserByEmail) {
      const lastUser = await User.find({}).sort({ userId: -1 }).limit(1);
      const userId = lastUser.length !== 0 ? lastUser[0].userId + 1 : 1;
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);
      const newUser = new User({
        userId,
        countryId,
        username,
        password: passwordHash,
        email,
        name,
        isLoggedIn: false
      });
      const createdUser = await newUser.save();
      handleResponseSuccess(origin, resStatuses.CREATED, resMessages.USER_CREATED, createdUser, res);
    } else {
      const errorsConflict = [];
      if (existentUserByUsername) errorsConflict.push(resMessages.USER_CONFLICT_USERNAME);
      if (existentUserByEmail) errorsConflict.push(resMessages.USER_CONFLICT_EMAIL);
      return next(
        new HandlerResponseError(origin, resStatuses.CONFLICT, resMessages.USER_CONFLICT, undefined, errorsConflict)
      );
    }
  } catch (err) {
    return next(new HandlerResponseError(origin, resStatuses.INTERNAL_SERVER_ERROR, err, undefined, undefined));
  }
}

export async function registerUser(req, res, next) {
  const origin = { functionName: 'registerUser()', path };
  try {
    await upload(req, res);
    const data = JSON.parse(req.body.data);
    req.body.data = data;
    const errorsValidation = validationResult(req);
    if (!errorsValidation.isEmpty()) {
      return next(
        new HandlerResponseError(
          origin,
          resStatuses.UNPROCESSABLE_ENTITY,
          resMessages.USER_UNPROCESSABLE,
          errorsValidation.array(),
          undefined
        )
      );
    }
    const countryId = Number(req.body.data.countryId);
    const username = req.body.data.username;
    const password = req.body.data.password;
    const email = req.body.data.email;
    const name = req.body.data.name;
    const existentUserByUsername = await User.findOne({ username });
    const existentUserByEmail = await User.findOne({ email });
    if (!existentUserByUsername && !existentUserByEmail) {
      const lastUser = await User.find({}).sort({ userId: -1 }).limit(1);
      const userId = lastUser.length !== 0 ? lastUser[0].userId + 1 : 1;
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(password, salt);
      const newUser = new User({
        userId,
        countryId,
        username,
        password: passwordHash,
        email,
        name,
        isLoggedIn: true
      });
      await newUser.save();
      delete newUser.password;
      const payload = { ...newUser };
      const tokenSessionSecret = process.env.JWT_SECRET;
      const options = { expiresIn: 2592000 };
      const token = await jwt.sign(payload, tokenSessionSecret, options);
      handleResponseSuccess(origin, resStatuses.CREATED, resMessages.USER_CREATED, token, res);
    } else {
      const errorsConflict = [];
      if (existentUserByUsername) errorsConflict.push(resMessages.USER_CONFLICT_USERNAME);
      if (existentUserByEmail) errorsConflict.push(resMessages.USER_CONFLICT_EMAIL);
      return next(
        new HandlerResponseError(origin, resStatuses.CONFLICT, resMessages.USER_CONFLICT, undefined, errorsConflict)
      );
    }
  } catch (err) {
    return next(new HandlerResponseError(origin, resStatuses.INTERNAL_SERVER_ERROR, err, undefined, undefined));
  }
}

export async function logInUser(req, res, next) {
  const origin = { functionName: 'logInUser()', path };
  try {
    const username = req.body.username;
    const password = req.body.password;
    const rememberSession = req.body.rememberSession;
    const requestedUserByUsername = await User.findOne({ username });
    if (requestedUserByUsername) {
      const matchedUserByPassword = await bcrypt.compare(password, requestedUserByUsername.password);
      if (matchedUserByPassword) {
        requestedUserByUsername.isLoggedIn = true;
        delete requestedUserByUsername.password;
        const payload = { ...requestedUserByUsername };
        const tokenSessionSecret = process.env.JWT_SECRET;
        const options = rememberSession ? { expiresIn: 31104000 } : { expiresIn: 2592000 };
        const token = await jwt.sign(payload, tokenSessionSecret, options);
        handleResponseSuccess(origin, resStatuses.OK, resMessages.USER_LOGGED_IN, token, res);
      } else {
        return next(
          new HandlerResponseError(
            origin,
            resStatuses.UNAUTHORIZED,
            resMessages.USER_UNAUTHORIZED,
            undefined,
            undefined
          )
        );
      }
    } else {
      return next(
        new HandlerResponseError(origin, resStatuses.NOT_FOUND, resMessages.USER_NOT_FOUND, undefined, undefined)
      );
    }
  } catch (err) {
    return next(new HandlerResponseError(origin, resStatuses.INTERNAL_SERVER_ERROR, err, undefined, undefined));
  }
}

export async function logOutUser(req, res, next) {
  const origin = { functionName: 'logOutUser()', path };
  try {
    const requestedUserByToken = req.user;
    if (requestedUserByToken) {
      requestedUserByToken.isLoggedIn = false;
      const loggedOutUser = await requestedUserByToken.save();
      handleResponseSuccess(origin, resStatuses.OK, resMessages.USER_LOGGED_OUT, loggedOutUser, res);
    } else {
      return next(
        new HandlerResponseError(origin, resStatuses.NOT_FOUND, resMessages.USER_NOT_FOUND, undefined, undefined)
      );
    }
  } catch (err) {
    return next(new HandlerResponseError(origin, resStatuses.INTERNAL_SERVER_ERROR, err, undefined, undefined));
  }
}

export async function readUsersAll(req, res, next) {
  const origin = { functionName: 'readUsersAll()', path };
  try {
    const readUsers = await User.find({}).sort({
      'name.first': 1,
      'name.last': 1
    });
    handleResponseSuccess(origin, resStatuses.OK, resMessages.USERS_READ, readUsers, res);
  } catch (err) {
    return next(new HandlerResponseError(origin, resStatuses.INTERNAL_SERVER_ERROR, err, undefined, undefined));
  }
}

export async function readUserByUserId(req, res, next) {
  const origin = { functionName: 'readUserByUserId()', path };
  try {
    const errorsValidation = validationResult(req);
    if (!errorsValidation.isEmpty()) {
      return next(
        new HandlerResponseError(
          origin,
          resStatuses.UNPROCESSABLE_ENTITY,
          resMessages.USER_UNPROCESSABLE,
          errorsValidation.array(),
          undefined
        )
      );
    }
    const userId = Number(req.params.userId);
    const readUser = await User.findOne({ userId });
    if (readUser) {
      handleResponseSuccess(origin, resStatuses.OK, resMessages.USER_READ, readUser, res);
    } else {
      return next(
        new HandlerResponseError(origin, resStatuses.NOT_FOUND, resMessages.USER_NOT_FOUND, undefined, undefined)
      );
    }
  } catch (err) {
    return next(new HandlerResponseError(origin, resStatuses.INTERNAL_SERVER_ERROR, err, undefined, undefined));
  }
}

export async function updateUserByUserId(req, res, next) {
  const origin = { functionName: 'updateUserByUserId()', path };
  try {
    await upload(req, res);
    const data = JSON.parse(req.body.data);
    req.body.data = data;
    const errorsValidation = validationResult(req);
    if (!errorsValidation.isEmpty()) {
      return next(
        new HandlerResponseError(
          origin,
          resStatuses.UNPROCESSABLE_ENTITY,
          resMessages.USER_UNPROCESSABLE,
          errorsValidation.array(),
          undefined
        )
      );
    }
    const userId = Number(req.params.userId);
    const countryId = Number(req.body.countryId);
    const username = req.body.username;
    const password = req.body.password;
    const email = req.body.email;
    const name = req.body.name;
    const requestedUser = await User.findOne({ userId });
    if (requestedUser) {
      const existentUserByEmail = await User.findOne({ email });
      if (!existentUserByEmail || requestedUser.email === email) {
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);
        requestedUser.username = username;
        requestedUser.countryId = countryId;
        requestedUser.password = passwordHash;
        requestedUser.email = email;
        requestedUser.name = name;
        const updatedUser = await requestedUser.save();
        handleResponseSuccess(origin, resStatuses.OK, resMessages.USER_UPDATED, updatedUser, res);
      } else {
        const errorsConflict = [resMessages.USER_CONFLICT_EMAIL];
        return next(
          new HandlerResponseError(origin, resStatuses.CONFLICT, resMessages.USER_CONFLICT, undefined, errorsConflict)
        );
      }
    } else {
      return next(
        new HandlerResponseError(origin, resStatuses.NOT_FOUND, resMessages.USER_NOT_FOUND, undefined, undefined)
      );
    }
  } catch (err) {
    return next(new HandlerResponseError(origin, resStatuses.INTERNAL_SERVER_ERROR, err, undefined, undefined));
  }
}

export async function deleteUsersAll(req, res, next) {
  const origin = { functionName: 'deleteUsersAll()', path };
  try {
    await User.deleteMany({});
    handleResponseSuccess(origin, resStatuses.NO_CONTENT, resMessages.USERS_DELETED, undefined, res);
  } catch (err) {
    return next(new HandlerResponseError(origin, resStatuses.INTERNAL_SERVER_ERROR, err, undefined, undefined));
  }
}

export async function deleteUserByUserId(req, res, next) {
  const origin = { functionName: 'deleteUserByUserId()', path };
  try {
    const errorsValidation = validationResult(req);
    if (!errorsValidation.isEmpty()) {
      return next(
        new HandlerResponseError(
          origin,
          resStatuses.UNPROCESSABLE_ENTITY,
          resMessages.USER_UNPROCESSABLE,
          errorsValidation.array(),
          undefined
        )
      );
    }
    const userId = Number(req.params.userId);
    const requestedUser = await User.findOne({ userId });
    if (requestedUser) {
      await User.deleteOne({ userId });
      handleResponseSuccess(origin, resStatuses.NO_CONTENT, resMessages.USER_DELETED, undefined, res);
    } else {
      return next(
        new HandlerResponseError(origin, resStatuses.NOT_FOUND, resMessages.USER_NOT_FOUND, undefined, undefined)
      );
    }
  } catch (err) {
    return next(new HandlerResponseError(origin, resStatuses.INTERNAL_SERVER_ERROR, err, undefined, undefined));
  }
}
