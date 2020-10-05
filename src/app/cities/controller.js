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

export async function createCity(req, res, next) {
  const origin = { functionName: 'createCity()', path };
  try {
    const errorsValidation = validationResult(req);
    if (!errorsValidation.isEmpty()) {
      return next(
        new HandlerResponseError(
          origin,
          resStatuses.UNPROCESSABLE_ENTITY,
          resMessages.CITY_UNPROCESSABLE,
          errorsValidation.array(),
          undefined
        )
      );
    }
    const countryId = Number(req.body.countryId);
    const name = req.body.name;
    const requestedCountry = await Country.findOne({ countryId });
    if (requestedCountry) {
      const existentCity = await City.findOne({ countryId, name });
      if (!existentCity) {
        const lastCity = await City.find({}).sort({ cityId: -1 }).limit(1);
        const cityId = lastCity.length !== 0 ? lastCity[0].cityId + 1 : 1;
        const newCity = new City({
          cityId,
          countryId,
          name
        });
        const createdCity = await newCity.save();
        handleResponseSuccess(origin, resStatuses.CREATED, resMessages.CITY_CREATED, createdCity, res);
      } else {
        const errorsConflict = [resMessages.CITY_CONFLICT_NAME];
        return next(
          new HandlerResponseError(origin, resStatuses.CONFLICT, resMessages.CITY_CONFLICT, undefined, errorsConflict)
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

export async function readCitiesAll(req, res, next) {
  const origin = { functionName: 'readCitiesAll()', path };
  try {
    const readCities = await City.find({}).sort({ name: 1 });
    handleResponseSuccess(origin, resStatuses.OK, resMessages.CITIES_READ, readCities, res);
  } catch (err) {
    return next(new HandlerResponseError(origin, resStatuses.INTERNAL_SERVER_ERROR, err, undefined, undefined));
  }
}

export async function readCitiesByCountryId(req, res, next) {
  const origin = { functionName: 'readCitiesByCountryId()', path };
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
      const readCities = await City.find({ countryId }).sort({ name: 1 });
      handleResponseSuccess(origin, resStatuses.OK, resMessages.CITIES_READ, readCities, res);
    } else {
      return next(
        new HandlerResponseError(origin, resStatuses.NOT_FOUND, resMessages.COUNTRY_NOT_FOUND, undefined, undefined)
      );
    }
  } catch (err) {
    return next(new HandlerResponseError(origin, resStatuses.INTERNAL_SERVER_ERROR, err, undefined, undefined));
  }
}

export async function readCityByCityId(req, res, next) {
  const origin = { functionName: 'readCityByCityId()', path };
  try {
    const errorsValidation = validationResult(req);
    if (!errorsValidation.isEmpty()) {
      return next(
        new HandlerResponseError(
          origin,
          resStatuses.UNPROCESSABLE_ENTITY,
          resMessages.CITY_UNPROCESSABLE,
          errorsValidation.array(),
          undefined
        )
      );
    }
    const cityId = Number(req.params.cityId);
    const readCity = await City.findOne({ cityId });
    if (readCity) {
      handleResponseSuccess(origin, resStatuses.OK, resMessages.CITY_READ, readCity, res);
    } else {
      return next(
        new HandlerResponseError(origin, resStatuses.NOT_FOUND, resMessages.CITY_NOT_FOUND, undefined, undefined)
      );
    }
  } catch (err) {
    return next(new HandlerResponseError(origin, resStatuses.INTERNAL_SERVER_ERROR, err, undefined, undefined));
  }
}

export async function updateCityByCityId(req, res, next) {
  const origin = { functionName: 'updateCityByCityId()', path };
  try {
    const errorsValidation = validationResult(req);
    if (!errorsValidation.isEmpty()) {
      return next(
        new HandlerResponseError(
          origin,
          resStatuses.UNPROCESSABLE_ENTITY,
          resMessages.CITY_UNPROCESSABLE,
          errorsValidation.array(),
          undefined
        )
      );
    }
    const cityId = Number(req.params.cityId);
    const countryId = Number(req.body.countryId);
    const name = req.body.name;
    const requestedCity = await City.findOne({ cityId });
    if (requestedCity) {
      const existentCity = await City.findOne({ countryId, name });
      if (!existentCity || (requestedCity.countryId === countryId && requestedCity.name === name)) {
        requestedCity.countryId = countryId;
        requestedCity.name = name;
        const updatedCity = await requestedCity.save();
        handleResponseSuccess(origin, resStatuses.OK, resMessages.CITY_UPDATED, updatedCity, res);
      } else {
        const errorsConflict = [resMessages.CITY_CONFLICT_NAME];
        return next(
          new HandlerResponseError(origin, resStatuses.CONFLICT, resMessages.CITY_CONFLICT, undefined, errorsConflict)
        );
      }
    } else {
      return next(
        new HandlerResponseError(origin, resStatuses.NOT_FOUND, resMessages.CITY_NOT_FOUND, undefined, undefined)
      );
    }
  } catch (err) {
    return next(new HandlerResponseError(origin, resStatuses.INTERNAL_SERVER_ERROR, err, undefined, undefined));
  }
}

export async function deleteCitiesAll(req, res, next) {
  const origin = { functionName: 'deleteCitiesAll()', path };
  try {
    await City.deleteMany({});
    await Itinerary.deleteMany({});
    await Activity.deleteMany({});
    handleResponseSuccess(origin, resStatuses.NO_CONTENT, resMessages.CITIES_DELETED, undefined, res);
  } catch (err) {
    return next(new HandlerResponseError(origin, resStatuses.INTERNAL_SERVER_ERROR, err, undefined, undefined));
  }
}

export async function deleteCitiesByCountryId(req, res, next) {
  const origin = { functionName: 'deleteCitiesByCountryId()', path };
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
      await City.deleteMany({ countryId });
      await Itinerary.deleteMany({ countryId });
      await Activity.deleteMany({ countryId });
      handleResponseSuccess(origin, resStatuses.NO_CONTENT, resMessages.CITIES_DELETED, undefined, res);
    } else {
      return next(
        new HandlerResponseError(origin, resStatuses.NOT_FOUND, resMessages.COUNTRY_NOT_FOUND, undefined, undefined)
      );
    }
  } catch (err) {
    return next(new HandlerResponseError(origin, resStatuses.INTERNAL_SERVER_ERROR, err, undefined, undefined));
  }
}

export async function deleteCityByCityId(req, res, next) {
  const origin = { functionName: 'deleteCityByCityId()', path };
  try {
    const errorsValidation = validationResult(req);
    if (!errorsValidation.isEmpty()) {
      return next(
        new HandlerResponseError(
          origin,
          resStatuses.UNPROCESSABLE_ENTITY,
          resMessages.CITY_UNPROCESSABLE,
          errorsValidation.array(),
          undefined
        )
      );
    }
    const cityId = Number(req.params.cityId);
    const requestedCity = await City.findOne({ cityId });
    if (requestedCity) {
      await City.deleteOne({ cityId });
      await Itinerary.deleteMany({ cityId });
      await Activity.deleteMany({ cityId });
      handleResponseSuccess(origin, resStatuses.NO_CONTENT, resMessages.CITY_DELETED, undefined, res);
    } else {
      return next(
        new HandlerResponseError(origin, resStatuses.NOT_FOUND, resMessages.CITY_NOT_FOUND, undefined, undefined)
      );
    }
  } catch (err) {
    return next(new HandlerResponseError(origin, resStatuses.INTERNAL_SERVER_ERROR, err, undefined, undefined));
  }
}
