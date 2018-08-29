const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
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
    passport.use(new FacebookStrategy({
            callbackURL: "http://localhost:3000/auth/facebook/redirect",
            clientID: process.env.FACEBOOK_APP_ID,
            clientSecret: process.env.FACEBOOK_APP_SECRET
        },
        function (accessToken, refreshToken, profile, done) {
            // console.log(profile.id);
            User.findOne({
                facebookId: profile.id
            }).then(currentUser => {
                if (currentUser) {
                    console.log('User already exists, please login');
                    return done(null, currentUser);
                }
                new User({
                    username: profile.displayName,
                    facebookId: profile.id
                }).save().then(newUser => {
                    // console.log(`You have created a new user ${newUser}`);
                    done(null, newUser);
                })
            })
        }
    ));
    passport.serializeUser(User.serializeUser());
    passport.deserializeUser(User.deserializeUser());
}