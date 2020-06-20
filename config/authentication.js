const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const config = require('./config');
const { signup, login, findUserbyId } = require('../services/users-service');

passport.use(
  'signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      const { name } = req.body;

      try {
        const newUser = await signup(email, name, password);

        if (!newUser) {
          done(null, false);
        }

        done(null, newUser);
      } catch (err) {
        done(err, false);
      }
    },
  ),
);

passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'email',
    },
    async (email, password, done) => {
      try {
        const user = await login(email, password);

        if (!user) {
          done(null, false);
        }

        done(null, user);
      } catch (err) {
        done(err, false);
      }
    },
  ),
);

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader('authorization'),
      secretOrKey: config.jwt.secret,
    },
    async (payload, done) => {
      try {
        const user = await findUserbyId(payload.sub);

        if (!user) {
          done(null, false);
        }

        done(null, user);
      } catch (err) {
        done(err, false);
      }
    },
  ),
);
