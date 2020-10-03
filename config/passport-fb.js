const passport = require('passport');
const FacebookStrategy = require('passport-facebook').Strategy;
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

passport.use(new FacebookStrategy({
        callbackURL: "http://localhost:3000/auth/facebook/redirect",
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET
    },
    (accessToken, refreshToken, profile, done) => {
        User.findOne({
            'facebookId': profile.id
        }).then(currentUser => {
            if (currentUser) {
                return done(null, currentUser);
                // console.log(`Is this current user ${currentUser}`)
            }
            new User({
                username: profile.username,
                name: profile.displayName,
                'facebookId': profile.id
            }).save().then(newUser => {
                done(null, newUser);
            })
        })
    }
));