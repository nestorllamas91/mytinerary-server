import { Router } from 'express';
const routerItinerary = Router();

import validatorItinerary from '$server/app/itineraries/validator';
import * as controllerItinerary from '$server/app/itineraries/controller';

routerItinerary.post('/itineraries', validatorItinerary, controllerItinerary.createItinerary);
routerItinerary.get('/itineraries', controllerItinerary.readItinerariesAll);
routerItinerary.get('/countries/:countryId/itineraries', controllerItinerary.readItinerariesByCountryId);
routerItinerary.get('/cities/:cityId/itineraries', controllerItinerary.readItinerariesByCityId);
routerItinerary.get('/itineraries/:itineraryId', controllerItinerary.readItineraryByItineraryId);
routerItinerary.put('/itineraries/:itineraryId', validatorItinerary, controllerItinerary.updateItineraryByItineraryId);
routerItinerary.delete('/itineraries', controllerItinerary.deleteItinerariesAll);
routerItinerary.delete('/countries/:countryId/itineraries', controllerItinerary.deleteItinerariesByCountryId);
routerItinerary.delete('/cities/:cityId/itineraries', controllerItinerary.deleteItinerariesByCityId);
routerItinerary.delete('/itineraries/:itineraryId', controllerItinerary.deleteItineraryByItineraryId);

export default routerItinerary;
