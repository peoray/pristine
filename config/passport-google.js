const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const User = require('../models/user');
require('dotenv').config();


module.exports = app => {
    app.use(
        require('express-session')({
            secret: 'Fuck the World!!!',
            resave: false,
            saveUninitialized: false,
            cookie: {
                secure: true,
                maxAge: 24 * 60 * 60 * 1000
            }
        })
    );
    // passport configs
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use(
        new GoogleStrategy({
                callbackURL: '/auth/google/redirect',
                clientID: process.env.CLIENT_ID,
                clientSecret: process.env.CLIENT_SECRET
            },
            (accessToken, refreshToken, profile, done) => {
                // console.log(profile);
                User.findOne({
                    googleId: profile.id
                }).then(currentUser => {
                    if (currentUser) {
                        console.log('User already exists, please login');
                        return done(null, currentUser);
                    }
                    new User({
                        username: profile.displayName,
                        googleId: profile.id
                    }).save().then(newUser => {
                        // console.log(`You have created a new user ${newUser}`);
                        done(null, newUser);
                    })
                })
            })
    )
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
}