import { Router } from 'express';
const routerRoot = Router();

import populateDatabase from '$server/app/populate';
import routerCountry from '$server/app/countries/router';
import routerCity from '$server/app/cities/router';
import routerItinerary from '$server/app/itineraries/router';
import routerActivity from '$server/app/activities/router';
import routerUser from '$server/app/users/router';
import routerComment from '$server/app/comments/router';

routerRoot.post('/populate', populateDatabase);
routerRoot.use('/', routerCountry);
routerRoot.use('/', routerCity);
routerRoot.use('/', routerItinerary);
routerRoot.use('/', routerActivity);
routerRoot.use('/', routerUser);
routerRoot.use('/', routerComment);

export default routerRoot;
