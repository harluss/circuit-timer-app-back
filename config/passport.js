const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user-model');
const bcrypt = require('bcryptjs');

passport.use('signup', new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
}, async (req, email, password, done) => {
    try {
        const user = await User.findOne({ email });

        if (user) {
            return done(null, false);
        }

        const name = req.body.name;
        const newUser = new User({ email, name, password });
        const savedUser = await newUser.save();

        done(null, savedUser);
    } catch (err) {
        done(err, false);
    }
}));

passport.use('login', new LocalStrategy({
    usernameField: 'email'
}, async (email, password, done) => {
    try {
        const user = await User.findOne({ email });

        if (!user) {
            return done(null, false);
        }

        const isCorrect = await bcrypt.compare(password, user.password);

        if (!isCorrect) {
            return done(null, false);
        }

        done(null, user);
    } catch (err) {
        done(err, false);
    }
}));

passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: process.env.JWT_SECRET
}, async (payload, done) => {
    try {
        const user = await User.findById(payload.sub);

        if (!user) {
            return done(null, false);
        }

        done(null, user);
    } catch (err) {
        done(err, false);
    }
}));