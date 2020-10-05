import cors from 'cors';
import { json, urlencoded } from 'express';
import passport from 'passport';
import passportStrategy from '$server/app/passport';
import routerRoot from '$server/app/router';
import { handleResponseError } from '$server/app/_utils/http-responses/handlers';

export default function useMiddleware(server) {
  server.use(cors());
  server.use(json());
  server.use(urlencoded({ extended: true }));
  server.use(passport.initialize());
  passport.use(passportStrategy);
  server.use('/api', routerRoot);
  server.use(handleResponseError);
  return server;
}
