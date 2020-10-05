import User from '$server/app/users/model';
import Country from '$server/app/countries/model';
import City from '$server/app/cities/model';
import Itinerary from '$server/app/itineraries/model';
import Activity from '$server/app/activities/model';

import { validationResult } from 'express-validator';
import { handleResponseSuccess } from '$server/app/_utils/http-responses/handlers';
import { HandlerResponseError } from '$server/app/_utils/http-responses/handlers';
import resStatuses from '$server/app/_utils/http-responses/statuses';
import resMessages from '$server/app/_utils/http-responses/messages';
const path = __filename;

export async function createCountry(req, res, next) {
  const origin = { functionName: 'createCountry()', path };
  try {
    const errorsValidation = validationResult(req);
    if (!errorsValidation.isEmpty()) {
      return next(
        new HandlerResponseError(
          origin,
          resStatuses.UNPROCESSABLE_ENTITY,
          resMessages.COUNTRY_UNPROCESSABLE,
          errorsValidation.array(),
          undefined
        )
      );
    }
    const shortName = req.body.shortName;
    const fullName = req.body.fullName;
    const continent = req.body.continent;
    const existentCountry = await Country.findOne({ fullName });
    if (!existentCountry) {
      const lastCountry = await Country.find({}).sort({ countryId: -1 }).limit(1);
      const countryId = lastCountry.length !== 0 ? lastCountry[0].countryId + 1 : 1;
      const newCountry = new Country({
        countryId,
        shortName,
        fullName,
        continent
      });
      const createdCountry = await newCountry.save();
      handleResponseSuccess(origin, resStatuses.CREATED, resMessages.COUNTRY_CREATED, createdCountry, res);
    } else {
      const errorsConflict = [resMessages.COUNTRY_CONFLICT_FULLNAME];
      return next(
        new HandlerResponseError(origin, resStatuses.CONFLICT, resMessages.COUNTRY_CONFLICT, undefined, errorsConflict)
      );
    }
  } catch (err) {
    return next(new HandlerResponseError(origin, resStatuses.INTERNAL_SERVER_ERROR, err, undefined, undefined));
  }
}

export async function readCountriesAll(req, res, next) {
  const origin = { functionName: 'readCountriesAll()', path };
  try {
    const readCountries = await Country.find({}).sort({ shortName: 1 });
    handleResponseSuccess(origin, resStatuses.OK, resMessages.COUNTRIES_READ, readCountries, res);
  } catch (err) {
    return next(new HandlerResponseError(origin, resStatuses.INTERNAL_SERVER_ERROR, err, undefined, undefined));
  }
}

export async function readCountryByCountryId(req, res, next) {
  const origin = { functionName: 'readCountryByCountryId()', path };
  try {
    const errorsValidation = validationResult(req);
    if (!errorsValidation.isEmpty()) {
      return next(
        new HandlerResponseError(
          origin,
          resStatuses.UNPROCESSABLE_ENTITY,
          resMessages.COUNTRY_UNPROCESSABLE,
          errorsValidation.array(),
          undefined
        )
      );
    }
    const countryId = Number(req.params.countryId);
    const readCountry = await Country.findOne({ countryId });
    if (readCountry) {
      handleResponseSuccess(origin, resStatuses.OK, resMessages.COUNTRY_READ, readCountry, res);
    } else {
      return next(
        new HandlerResponseError(origin, resStatuses.NOT_FOUND, resMessages.COUNTRY_NOT_FOUND, undefined, undefined)
      );
    }
  } catch (err) {
    return next(new HandlerResponseError(origin, resStatuses.INTERNAL_SERVER_ERROR, err, undefined, undefined));
  }
}

export async function updateCountryByCountryId(req, res, next) {
  const origin = { functionName: 'updateCountryByCountryId()', path };
  try {
    const errorsValidation = validationResult(req);
    if (!errorsValidation.isEmpty()) {
      return next(
        new HandlerResponseError(
          origin,
          resStatuses.UNPROCESSABLE_ENTITY,
          resMessages.COUNTRY_UNPROCESSABLE,
          errorsValidation.array(),
          undefined
        )
      );
    }
    const countryId = Number(req.params.countryId);
    const shortName = req.body.shortName;
    const fullName = req.body.fullName;
    const continent = req.body.continent;
    const requestedCountry = await Country.findOne({ countryId });
    if (requestedCountry) {
      const existentCountry = await Country.findOne({ fullName });
      if (!existentCountry || requestedCountry.fullName === fullName) {
        requestedCountry.shortName = shortName;
        requestedCountry.fullName = fullName;
        requestedCountry.continent = continent;
        const updatedCountry = await requestedCountry.save();
        handleResponseSuccess(origin, resStatuses.OK, resMessages.COUNTRY_UPDATED, updatedCountry, res);
      } else {
        const errorsConflict = [resMessages.COUNTRY_CONFLICT_FULLNAME];
        return next(
          new HandlerResponseError(
            origin,
            resStatuses.CONFLICT,
            resMessages.COUNTRY_CONFLICT,
            undefined,
            errorsConflict
          )
        );
      }
    } else {
      return next(
        new HandlerResponseError(origin, resStatuses.NOT_FOUND, resMessages.COUNTRY_NOT_FOUND, undefined, undefined)
      );
    }
  } catch (err) {
    return next(new HandlerResponseError(origin, resStatuses.INTERNAL_SERVER_ERROR, err, undefined, undefined));
  }
}

export async function deleteCountriesAll(req, res, next) {
  const origin = { functionName: 'deleteCountriesAll()', path };
  try {
    const users = User.find({});
    await Promise.all(
      users.map(async user => {
        user.countryId = -1;
        await user.save();
      })
    );
    await Country.deleteMany({});
    await City.deleteMany({});
    await Itinerary.deleteMany({});
    await Activity.deleteMany({});
    handleResponseSuccess(origin, resStatuses.NO_CONTENT, resMessages.COUNTRIES_DELETED, undefined, res);
  } catch (err) {
    return next(new HandlerResponseError(origin, resStatuses.INTERNAL_SERVER_ERROR, err, undefined, undefined));
  }
}

export async function deleteCountryByCountryId(req, res, next) {
  const origin = { functionName: 'deleteCountryByCountryId()', path };
  try {
    const errorsValidation = validationResult(req);
    if (!errorsValidation.isEmpty()) {
      return next(
        new HandlerResponseError(
          origin,
          resStatuses.UNPROCESSABLE_ENTITY,
          resMessages.COUNTRY_UNPROCESSABLE,
          errorsValidation.array(),
          undefined
        )
      );
    }
    const countryId = Number(req.params.countryId);
    const requestedCountry = await Country.findOne({ countryId });
    if (requestedCountry) {
      const users = User.find({ countryId });
      await Promise.all(
        users.map(async user => {
          user.countryId = -1;
          await user.save();
        })
      );
      await Country.deleteOne({ countryId });
      await City.deleteMany({ countryId });
      await Itinerary.deleteMany({ countryId });
      await Activity.deleteMany({ countryId });
      handleResponseSuccess(origin, resStatuses.NO_CONTENT, resMessages.COUNTRY_DELETED, undefined, res);
    } else {
      return next(
        new HandlerResponseError(origin, resStatuses.NOT_FOUND, resMessages.COUNTRY_NOT_FOUND, undefined, undefined)
      );
    }
  } catch (err) {
    return next(new HandlerResponseError(origin, resStatuses.INTERNAL_SERVER_ERROR, err, undefined, undefined));
  }
}
