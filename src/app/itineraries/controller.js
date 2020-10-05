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

export async function createItinerary(req, res, next) {
  const origin = { functionName: 'createItinerary()', path };
  try {
    const errorsValidation = validationResult(req);
    if (!errorsValidation.isEmpty()) {
      return next(
        new HandlerResponseError(
          origin,
          resStatuses.UNPROCESSABLE_ENTITY,
          resMessages.ITINERARY_UNPROCESSABLE,
          errorsValidation.array(),
          undefined
        )
      );
    }
    const cityId = Number(req.body.cityId);
    const countryId = Number(req.body.countryId);
    const userId = Number(req.body.userId);
    const title = req.body.title;
    const rating = Number(req.body.rating);
    const duration = Number(req.body.duration);
    const price = req.body.price;
    const hashtags = req.body.hashtags;
    const requestedCity = await City.findOne({ cityId });
    if (requestedCity) {
      const existentItinerary = await Itinerary.findOne({ cityId, title });
      if (!existentItinerary) {
        const lastItinerary = await Itinerary.find({}).sort({ itineraryId: -1 }).limit(1);
        const itineraryId = lastItinerary.length !== 0 ? lastItinerary[0].itineraryId + 1 : 1;
        const newItinerary = new Itinerary({
          itineraryId,
          cityId,
          countryId,
          userId,
          title,
          rating,
          duration,
          price,
          hashtags
        });
        const createdItinerary = await newItinerary.save();
        handleResponseSuccess(origin, resStatuses.CREATED, resMessages.ITINERARY_CREATED, createdItinerary, res);
      } else {
        const errorsConflict = [resMessages.ITINERARY_CONFLICT_TITLE];
        return next(
          new HandlerResponseError(
            origin,
            resStatuses.CONFLICT,
            resMessages.ITINERARY_CONFLICT,
            undefined,
            errorsConflict
          )
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

export async function readItinerariesAll(req, res, next) {
  const origin = { functionName: 'readItinerariesAll()', path };
  try {
    const readItineraries = await Itinerary.find({}).sort({ cityId: 1, itineraryId: 1 });
    handleResponseSuccess(origin, resStatuses.OK, resMessages.ITINERARIES_READ, readItineraries, res);
  } catch (err) {
    return next(new HandlerResponseError(origin, resStatuses.INTERNAL_SERVER_ERROR, err, undefined, undefined));
  }
}

export async function readItinerariesByCountryId(req, res, next) {
  const origin = { functionName: 'readItinerariesByCountryId()', path };
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
      const readItineraries = await Itinerary.find({ countryId }).sort({ cityId: 1, itineraryId: 1 });
      handleResponseSuccess(origin, resStatuses.OK, resMessages.ITINERARIES_READ, readItineraries, res);
    } else {
      return next(
        new HandlerResponseError(origin, resStatuses.NOT_FOUND, resMessages.COUNTRY_NOT_FOUND, undefined, undefined)
      );
    }
  } catch (err) {
    return next(new HandlerResponseError(origin, resStatuses.INTERNAL_SERVER_ERROR, err, undefined, undefined));
  }
}

export async function readItinerariesByCityId(req, res, next) {
  const origin = { functionName: 'readItinerariesByCityId()', path };
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
      const readItineraries = await Itinerary.find({ cityId }).sort({ itineraryId: 1 });
      handleResponseSuccess(origin, resStatuses.OK, resMessages.ITINERARIES_READ, readItineraries, res);
    } else {
      return next(
        new HandlerResponseError(origin, resStatuses.NOT_FOUND, resMessages.CITY_NOT_FOUND, undefined, undefined)
      );
    }
  } catch (err) {
    return next(new HandlerResponseError(origin, resStatuses.INTERNAL_SERVER_ERROR, err, undefined, undefined));
  }
}

export async function readItineraryByItineraryId(req, res, next) {
  const origin = { functionName: 'readItineraryByItineraryId()', path };
  try {
    const errorsValidation = validationResult(req);
    if (!errorsValidation.isEmpty()) {
      return next(
        new HandlerResponseError(
          origin,
          resStatuses.UNPROCESSABLE_ENTITY,
          resMessages.ITINERARY_UNPROCESSABLE,
          errorsValidation.array(),
          undefined
        )
      );
    }
    const itineraryId = req.params.itineraryId;
    const readItinerary = await Itinerary.findOne({ itineraryId });
    if (readItinerary) {
      handleResponseSuccess(origin, resStatuses.OK, resMessages.ITINERARY_READ, readItinerary, res);
    } else {
      return next(
        new HandlerResponseError(origin, resStatuses.NOT_FOUND, resMessages.ITINERARY_NOT_FOUND, undefined, undefined)
      );
    }
  } catch (err) {
    return next(new HandlerResponseError(origin, resStatuses.INTERNAL_SERVER_ERROR, err, undefined, undefined));
  }
}

export async function updateItineraryByItineraryId(req, res, next) {
  const origin = { functionName: 'updateItineraryByItineraryId()', path };
  try {
    const errorsValidation = validationResult(req);
    if (!errorsValidation.isEmpty()) {
      return next(
        new HandlerResponseError(
          origin,
          resStatuses.UNPROCESSABLE_ENTITY,
          resMessages.ITINERARY_UNPROCESSABLE,
          errorsValidation.array(),
          undefined
        )
      );
    }
    const itineraryId = Number(req.params.itineraryId);
    const cityId = Number(req.body.cityId);
    const countryId = Number(req.body.countryId);
    const userId = Number(req.body.userId);
    const title = req.body.title;
    const rating = Number(req.body.rating);
    const duration = Number(req.body.duration);
    const price = req.body.price;
    const hashtags = req.body.hashtags;
    const requestedItinerary = await Itinerary.findOne({ itineraryId });
    if (requestedItinerary) {
      const existentItinerary = await Itinerary.findOne({ cityId, title });
      if (!existentItinerary || (requestedItinerary.cityId === cityId && requestedItinerary.title === title)) {
        requestedItinerary.cityId = cityId;
        requestedItinerary.countryId = countryId;
        requestedItinerary.userId = userId;
        requestedItinerary.title = title;
        requestedItinerary.rating = rating;
        requestedItinerary.duration = duration;
        requestedItinerary.price = price;
        requestedItinerary.hashtags = hashtags;
        const updatedItinerary = await requestedItinerary.save();
        handleResponseSuccess(origin, resStatuses.OK, resMessages.ITINERARY_UPDATED, updatedItinerary, res);
      } else {
        const errorsConflict = [resMessages.ITINERARY_CONFLICT_TITLE];
        return next(
          new HandlerResponseError(
            origin,
            resStatuses.CONFLICT,
            resMessages.ITINERARY_CONFLICT,
            undefined,
            errorsConflict
          )
        );
      }
    } else {
      return next(
        new HandlerResponseError(origin, resStatuses.NOT_FOUND, resMessages.ITINERARY_NOT_FOUND, undefined, undefined)
      );
    }
  } catch (err) {
    return next(new HandlerResponseError(origin, resStatuses.INTERNAL_SERVER_ERROR, err, undefined, undefined));
  }
}

export async function deleteItinerariesAll(req, res, next) {
  const origin = { functionName: 'deleteItinerariesAll()', path };
  try {
    await Itinerary.deleteMany({});
    await Activity.deleteMany({});
    handleResponseSuccess(origin, resStatuses.NO_CONTENT, resMessages.ITINERARIES_DELETED, undefined, res);
  } catch (err) {
    return next(new HandlerResponseError(origin, resStatuses.INTERNAL_SERVER_ERROR, err, undefined, undefined));
  }
}

export async function deleteItinerariesByCountryId(req, res, next) {
  const origin = { functionName: 'deleteItinerariesByCountryId()', path };
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
      await Itinerary.deleteMany({ countryId });
      handleResponseSuccess(origin, resStatuses.NO_CONTENT, resMessages.ITINERARIES_DELETED, undefined, res);
    } else {
      return next(
        new HandlerResponseError(origin, resStatuses.NOT_FOUND, resMessages.COUNTRY_NOT_FOUND, undefined, undefined)
      );
    }
  } catch (err) {
    return next(new HandlerResponseError(origin, resStatuses.INTERNAL_SERVER_ERROR, err, undefined, undefined));
  }
}

export async function deleteItinerariesByCityId(req, res, next) {
  const origin = { functionName: 'deleteItinerariesByCityId()', path };
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
      await Itinerary.deleteMany({ cityId });
      await Activity.deleteMany({ cityId });
      handleResponseSuccess(origin, resStatuses.NO_CONTENT, resMessages.ITINERARIES_DELETED, undefined, res);
    } else {
      return next(
        new HandlerResponseError(origin, resStatuses.NOT_FOUND, resMessages.CITY_NOT_FOUND, undefined, undefined)
      );
    }
  } catch (err) {
    return next(new HandlerResponseError(origin, resStatuses.INTERNAL_SERVER_ERROR, err, undefined, undefined));
  }
}

export async function deleteItineraryByItineraryId(req, res, next) {
  const origin = { functionName: 'deleteItineraryByItineraryId()', path };
  try {
    const errorsValidation = validationResult(req);
    if (!errorsValidation.isEmpty()) {
      return next(
        new HandlerResponseError(
          origin,
          resStatuses.UNPROCESSABLE_ENTITY,
          resMessages.ITINERARY_UNPROCESSABLE,
          errorsValidation.array(),
          undefined
        )
      );
    }
    const itineraryId = Number(req.params.itineraryId);
    const requestedItinerary = await Itinerary.findOne({ itineraryId });
    if (requestedItinerary) {
      await Itinerary.deleteOne({ itineraryId });
      await Activity.deleteMany({ itineraryId });
      handleResponseSuccess(origin, resStatuses.NO_CONTENT, resMessages.ITINERARY_DELETED, undefined, res);
    } else {
      return next(
        new HandlerResponseError(origin, resStatuses.NOT_FOUND, resMessages.ITINERARY_NOT_FOUND, undefined, undefined)
      );
    }
  } catch (err) {
    return next(new HandlerResponseError(origin, resStatuses.INTERNAL_SERVER_ERROR, err, undefined, undefined));
  }
}
