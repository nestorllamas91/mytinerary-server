import { Strategy, ExtractJwt } from 'passport-jwt';
import User from '$server/app/users/model';

const tokenSessionSecret = process.env.JWT_SECRET;
const passportOptions = { jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: tokenSessionSecret };

export default new Strategy(passportOptions, async ({ userId }, done) => {
  const readUser = await User.findOne({ userId });
  if (!readUser) {
    return done(null, false);
  } else {
    return done(null, readUser);
  }
});
