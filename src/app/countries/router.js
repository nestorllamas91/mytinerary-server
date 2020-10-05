import { Router } from 'express';
const routerCountry = Router();

import validatorCountry from '$server/app/countries/validator';
import * as controllerCountry from '$server/app/countries/controller';

routerCountry.post('/countries', validatorCountry, controllerCountry.createCountry);
routerCountry.get('/countries', controllerCountry.readCountriesAll);
routerCountry.get('/countries/:countryId', controllerCountry.readCountryByCountryId);
routerCountry.put('/countries/:countryId', validatorCountry, controllerCountry.updateCountryByCountryId);
routerCountry.delete('/countries', controllerCountry.deleteCountriesAll);
routerCountry.delete('/countries/:countryId', controllerCountry.deleteCountryByCountryId);

export default routerCountry;
