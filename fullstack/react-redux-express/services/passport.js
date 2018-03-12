const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) => {
    console.log('serializerUser', user);
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    console.log('deserializeUser', id);
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(
    new GoogleStrategy(
        {
            clientID: keys.googleClientID,
            clientSecret: keys.googleClientSecret,
            callbackURL: '/auth/google/callback',
            proxy: true
        },
        // routing -> '/auth/google/callback'
        async (accessToken, refreshToken, profile, done) => {
            const existingUser = await User.findOne({ googleId: profile.id });

            if (existingUser) {
                // We already have a user with that profile ID
                return done(null, existingUser);
            }

            // a user doesn't exist with this ID, make a new record of it
            const user = new User({ googleId: profile.id }).save();
            done(null, user); // null no error
        }
    )
);
