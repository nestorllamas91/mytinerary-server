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

export async function createActivity(req, res, next) {
  const origin = { functionName: 'createActivity()', path };
  try {
    const errorsValidation = validationResult(req);
    if (!errorsValidation.isEmpty()) {
      return next(
        new HandlerResponseError(
          origin,
          resStatuses.UNPROCESSABLE_ENTITY,
          resMessages.ACTIVITY_UNPROCESSABLE,
          errorsValidation.array(),
          undefined
        )
      );
    }
    const itineraryId = Number(req.body.itineraryId);
    const cityId = Number(req.body.cityId);
    const countryId = Number(req.body.countryId);
    const title = req.body.title;
    const description = req.body.description;
    const requestedItinerary = await Itinerary.findOne({ itineraryId });
    if (requestedItinerary) {
      const existentActivity = await Activity.findOne({ itineraryId, title });
      if (!existentActivity) {
        const lastActivity = await Activity.find({}).sort({ activityId: -1 }).limit(1);
        const activityId = lastActivity.length !== 0 ? lastActivity[0].activityId + 1 : 1;
        const newActivity = new Activity({
          activityId,
          itineraryId,
          cityId,
          countryId,
          title,
          description
        });
        const createdActivity = await newActivity.save();
        handleResponseSuccess(origin, resStatuses.CREATED, resMessages.ACTIVITY_CREATED, createdActivity, res);
      } else {
        const errorsConflict = [resMessages.ACTIVITY_CONFLICT_TITLE];
        return next(
          new HandlerResponseError(
            origin,
            resStatuses.CONFLICT,
            resMessages.ACTIVITY_CONFLICT,
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

export async function readActivitiesAll(req, res, next) {
  const origin = { functionName: 'readActivitiesAll()', path };
  try {
    const readActivities = await Activity.find({}).sort({ cityId: 1, itineraryId: 1, activityId: 1 });
    handleResponseSuccess(origin, resStatuses.OK, resMessages.ACTIVITIES_READ, readActivities, res);
  } catch (err) {
    return next(new HandlerResponseError(origin, resStatuses.INTERNAL_SERVER_ERROR, err, undefined, undefined));
  }
}

export async function readActivitiesByCountryId(req, res, next) {
  const origin = { functionName: 'readActivitiesByCountryId()', path };
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
      const readActivities = await Activity.find({ countryId }).sort({ cityId: 1, itineraryId: 1, activityId: 1 });
      handleResponseSuccess(origin, resStatuses.OK, resMessages.ACTIVITIES_READ, readActivities, res);
    } else {
      return next(
        new HandlerResponseError(origin, resStatuses.NOT_FOUND, resMessages.COUNTRY_NOT_FOUND, undefined, undefined)
      );
    }
  } catch (err) {
    return next(new HandlerResponseError(origin, resStatuses.INTERNAL_SERVER_ERROR, err, undefined, undefined));
  }
}

export async function readActivitiesByCityId(req, res, next) {
  const origin = { functionName: 'readActivitiesByCityId()', path };
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
      const readActivities = await Activity.find({ cityId }).sort({ itineraryId: 1, activityId: 1 });
      handleResponseSuccess(origin, resStatuses.OK, resMessages.ACTIVITIES_READ, readActivities, res);
    } else {
      return next(
        new HandlerResponseError(origin, resStatuses.NOT_FOUND, resMessages.CITY_NOT_FOUND, undefined, undefined)
      );
    }
  } catch (err) {
    return next(new HandlerResponseError(origin, resStatuses.INTERNAL_SERVER_ERROR, err, undefined, undefined));
  }
}

export async function readActivitiesByItineraryId(req, res, next) {
  const origin = { functionName: 'readActivitiesByItineraryId()', path };
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
      const readActivities = await Activity.find({ itineraryId }).sort({ activityId: 1 });
      handleResponseSuccess(origin, resStatuses.OK, resMessages.ACTIVITIES_READ, readActivities, res);
    } else {
      return next(
        new HandlerResponseError(origin, resStatuses.NOT_FOUND, resMessages.ITINERARY_NOT_FOUND, undefined, undefined)
      );
    }
  } catch (err) {
    return next(new HandlerResponseError(origin, resStatuses.INTERNAL_SERVER_ERROR, err, undefined, undefined));
  }
}

export async function readActivityByActivityId(req, res, next) {
  const origin = { functionName: 'readActivityByActivityId()', path };
  try {
    const errorsValidation = validationResult(req);
    if (!errorsValidation.isEmpty()) {
      return next(
        new HandlerResponseError(
          origin,
          resStatuses.UNPROCESSABLE_ENTITY,
          resMessages.ACTIVITY_UNPROCESSABLE,
          errorsValidation.array(),
          undefined
        )
      );
    }
    const activityId = Number(req.params.activityId);
    const readActivity = await Activity.findOne({ activityId });
    if (readActivity) {
      handleResponseSuccess(origin, resStatuses.OK, resMessages.ACTIVITY_READ, readActivity, res);
    } else {
      return next(
        new HandlerResponseError(origin, resStatuses.NOT_FOUND, resMessages.ACTIVITY_NOT_FOUND, undefined, undefined)
      );
    }
  } catch (err) {
    return next(new HandlerResponseError(origin, resStatuses.INTERNAL_SERVER_ERROR, err, undefined, undefined));
  }
}

export async function updateActivityByActivityId(req, res, next) {
  const origin = { functionName: 'updateActivityByActivityId()', path };
  try {
    const errorsValidation = validationResult(req);
    if (!errorsValidation.isEmpty()) {
      return next(
        new HandlerResponseError(
          origin,
          resStatuses.UNPROCESSABLE_ENTITY,
          resMessages.ACTIVITY_UNPROCESSABLE,
          errorsValidation.array(),
          undefined
        )
      );
    }
    const activityId = Number(req.params.activityId);
    const itineraryId = Number(req.body.itineraryId);
    const cityId = Number(req.body.cityId);
    const countryId = Number(req.body.countryId);
    const title = req.body.title;
    const description = req.body.description;
    const requestedActivity = await Activity.findOne({ activityId });
    if (requestedActivity) {
      const existentActivity = await Activity.findOne({ itineraryId, title });
      if (!existentActivity || (requestedActivity.itineraryId === itineraryId && requestedActivity.title === title)) {
        requestedActivity.itineraryId = itineraryId;
        requestedActivity.cityId = cityId;
        requestedActivity.countryId = countryId;
        requestedActivity.title = title;
        requestedActivity.description = description;
        const updatedActivity = await requestedActivity.save();
        handleResponseSuccess(origin, resStatuses.OK, resMessages.ACTIVITY_UPDATED, updatedActivity, res);
      } else {
        return next(
          new HandlerResponseError(origin, resStatuses.CONFLICT, resMessages.ACTIVITY_CONFLICT, undefined, undefined)
        );
      }
    } else {
      const errorsConflict = [resMessages.ACTIVITY_CONFLICT_TITLE];
      return next(
        new HandlerResponseError(
          origin,
          resStatuses.NOT_FOUND,
          resMessages.ACTIVITY_NOT_FOUND,
          undefined,
          errorsConflict
        )
      );
    }
  } catch (err) {
    return next(new HandlerResponseError(origin, resStatuses.INTERNAL_SERVER_ERROR, err, undefined, undefined));
  }
}

export async function deleteActivitiesAll(req, res, next) {
  const origin = { functionName: 'deleteActivitiesAll()', path };
  try {
    await Activity.deleteMany({});
    handleResponseSuccess(origin, resStatuses.NO_CONTENT, resMessages.ACTIVITIES_DELETED, undefined, res);
  } catch (err) {
    return next(new HandlerResponseError(origin, resStatuses.INTERNAL_SERVER_ERROR, err, undefined, undefined));
  }
}

export async function deleteActivitiesByCountryId(req, res, next) {
  const origin = { functionName: 'deleteActivitiesByCountryId()', path };
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
      await Activity.deleteMany({ countryId });
      handleResponseSuccess(origin, resStatuses.NO_CONTENT, resMessages.ACTIVITIES_DELETED, undefined, res);
    } else {
      return next(
        new HandlerResponseError(origin, resStatuses.NOT_FOUND, resMessages.COUNTRY_NOT_FOUND, undefined, undefined)
      );
    }
  } catch (err) {
    return next(new HandlerResponseError(origin, resStatuses.INTERNAL_SERVER_ERROR, err, undefined, undefined));
  }
}

export async function deleteActivitiesByCityId(req, res, next) {
  const origin = { functionName: 'deleteActivitiesByCityId()', path };
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
      await Activity.deleteMany({ cityId });
      handleResponseSuccess(origin, resStatuses.NO_CONTENT, resMessages.ACTIVITIES_DELETED, undefined, res);
    } else {
      return next(
        new HandlerResponseError(origin, resStatuses.NOT_FOUND, resMessages.CITY_NOT_FOUND, undefined, undefined)
      );
    }
  } catch (err) {
    return next(new HandlerResponseError(origin, resStatuses.INTERNAL_SERVER_ERROR, err, undefined, undefined));
  }
}

export async function deleteActivitiesByItineraryId(req, res, next) {
  const origin = { functionName: 'deleteActivitiesByItineraryId()', path };
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
      await Activity.deleteMany({ itineraryId });
      handleResponseSuccess(origin, resStatuses.NO_CONTENT, resMessages.ACTIVITIES_DELETED, undefined, res);
    } else {
      return next(
        new HandlerResponseError(origin, resStatuses.NOT_FOUND, resMessages.ITINERARY_NOT_FOUND, undefined, undefined)
      );
    }
  } catch (err) {
    return next(new HandlerResponseError(origin, resStatuses.INTERNAL_SERVER_ERROR, err, undefined, undefined));
  }
}

export async function deleteActivityByActivityId(req, res, next) {
  const origin = { functionName: 'deleteActivityByActivityId()', path };
  try {
    const errorsValidation = validationResult(req);
    if (!errorsValidation.isEmpty()) {
      return next(
        new HandlerResponseError(
          origin,
          resStatuses.UNPROCESSABLE_ENTITY,
          resMessages.ACTIVITY_UNPROCESSABLE,
          errorsValidation.array(),
          undefined
        )
      );
    }
    const activityId = Number(req.params.activityId);
    const requestedActivity = await Activity.findOne({ activityId });
    if (requestedActivity) {
      await Activity.deleteOne({ activityId });
      handleResponseSuccess(origin, resStatuses.NO_CONTENT, resMessages.ACTIVITY_DELETED, undefined, res);
    } else {
      return next(
        new HandlerResponseError(origin, resStatuses.NOT_FOUND, resMessages.ACTIVITY_NOT_FOUND, undefined, undefined)
      );
    }
  } catch (err) {
    return next(new HandlerResponseError(origin, resStatuses.INTERNAL_SERVER_ERROR, err, undefined, undefined));
  }
}
