import * as usersData from '$server/app/users/populate';
import * as countriesData from '$server/app/countries/populate';
import * as citiesData from '$server/app/cities/populate';
import * as itinerariesData from '$server/app/itineraries/populate';
import * as activitiesData from '$server/app/activities/populate';

import { handleResponseSuccess } from '$server/app/_utils/http-responses/handlers';
import { HandlerResponseError } from '$server/app/_utils/http-responses/handlers';
import resStatuses from '$server/app/_utils/http-responses/statuses';
import resMessages from '$server/app/_utils/http-responses/messages';
const path = __filename;

export default async function populateDatabase(req, res, next) {
  const origin = { functionName: 'populateDatabase()', path };
  try {
    const populatedUsers = await Promise.all(Object.values(usersData).map(async user => await user.save()));
    const populatedCountries = await Promise.all(
      Object.values(countriesData).map(async country => await country.save())
    );
    const populatedCities = await Promise.all(Object.values(citiesData).map(async city => await city.save()));
    const populatedItineraries = await Promise.all(
      Object.values(itinerariesData).map(async itinerary => await itinerary.save())
    );
    const populatedActivities = await Promise.all(
      Object.values(activitiesData).map(async activity => await activity.save())
    );
    const populatedDatabase = {
      populatedUsers,
      populatedCountries,
      populatedCities,
      populatedItineraries,
      populatedActivities
    };
    handleResponseSuccess(origin, resStatuses.CREATED, resMessages.DATABASE_POPULATED, populatedDatabase, res);
  } catch (err) {
    return next(new HandlerResponseError(origin, resStatuses.INTERNAL_SERVER_ERROR, err, undefined, undefined));
  }
}
