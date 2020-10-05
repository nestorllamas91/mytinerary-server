import { Router } from 'express';
const routerUser = Router();

import { validatorUser, validatorUserLogin } from '$server/app/users/validator';
import authenticatorUser from '$server/app/users/authenticator';
import * as controllerUser from '$server/app/users/controller';

routerUser.post('/users', validatorUser, controllerUser.createUser);
routerUser.post('/users/register', validatorUser, controllerUser.registerUser);
routerUser.post('/users/login', validatorUserLogin, controllerUser.logInUser);
routerUser.post('/users/logout', authenticatorUser, controllerUser.logOutUser);
routerUser.get('/users', controllerUser.readUsersAll);
routerUser.get('/users/:userId', controllerUser.readUserByUserId);
routerUser.put('/users/:userId', validatorUser, controllerUser.updateUserByUserId);
routerUser.delete('/users', controllerUser.deleteUsersAll);
routerUser.delete('/users/:userId', controllerUser.deleteUserByUserId);

export default routerUser;
