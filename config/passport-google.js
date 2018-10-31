const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user');
require('dotenv').config();

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        await User.findById(id, (err, user) => {
            done(err, user);
        });
    } catch (error) {
        done(error, null)
    }
});

// passport configs
passport.use(
    new GoogleStrategy({
            callbackURL: '/auth/google/redirect',
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        },
        (accessToken, refreshToken, profile, done) => {
            User.findOne({
                'googleId': profile.id
            }).then(currentUser => {
                if (currentUser) {
                    return done(null, currentUser);
                }
                new User({
                    'googleId': profile.id,
                    'username': profile.name.givenName,
                    'name': profile.displayName

                }).save().then(newUser => {
                    done(null, newUser);
                })
            })
        }
    ));