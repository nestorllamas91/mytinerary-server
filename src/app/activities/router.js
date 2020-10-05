import { Router } from 'express';
const routerActivity = Router();

import validatorActivity from '$server/app/activities/validator';
import * as controllerActivity from '$server/app/activities/controller';

routerActivity.post('/activities', validatorActivity, controllerActivity.createActivity);
routerActivity.get('/activities', controllerActivity.readActivitiesAll);
routerActivity.get('/countries/:countryId/activities', controllerActivity.readActivitiesByCountryId);
routerActivity.get('/cities/:cityId/activities', controllerActivity.readActivitiesByCityId);
routerActivity.get('/itineraries/:itineraryId/activities', controllerActivity.readActivitiesByItineraryId);
routerActivity.get('/activities/:activityId', controllerActivity.readActivityByActivityId);
routerActivity.put('/activities/:activityId', validatorActivity, controllerActivity.updateActivityByActivityId);
routerActivity.delete('/activities', controllerActivity.deleteActivitiesAll);
routerActivity.delete('/countries/:countryId/activities', controllerActivity.deleteActivitiesByCountryId);
routerActivity.delete('/cities/:cityId/activities', controllerActivity.deleteActivitiesByCityId);
routerActivity.delete('/itineraries/:itineraryId/activities', controllerActivity.deleteActivitiesByItineraryId);
routerActivity.delete('/activities/:activityId', controllerActivity.deleteActivityByActivityId);

export default routerActivity;
