import { Router } from 'express';
const routerCity = Router();

import validatorCity from '$server/app/cities/validator';
import * as controllerCity from '$server/app/cities/controller';

routerCity.post('/cities', validatorCity, controllerCity.createCity);
routerCity.get('/cities', controllerCity.readCitiesAll);
routerCity.get('/countries/:countryId/cities', controllerCity.readCitiesByCountryId);
routerCity.get('/cities/:cityId', controllerCity.readCityByCityId);
routerCity.put('/cities/:cityId', validatorCity, controllerCity.updateCityByCityId);
routerCity.delete('/cities', controllerCity.deleteCitiesAll);
routerCity.delete('/countries/:countryId/cities', controllerCity.deleteCitiesByCountryId);
routerCity.delete('/cities/:cityId', controllerCity.deleteCityByCityId);

export default routerCity;
