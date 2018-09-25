const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

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


passport.use('local', new LocalStrategy(async (username, password, done) => {
    try {
        await User.findOne({
            username: username
        }, (err, user) => {
            if (err) {
                return done(err);
            }
            if (!user) {
                return done(null, false, {
                    message: 'unknown user'
                });
            }
            // check if password is correct
            const isValid = User.comparePassword(password, user.password)

            if (!isValid) {
                return done(null, false, {
                    message: 'unknown password'
                });
            }
            if (!user.active) {
                return done(null, false, {
                    message: 'You need to verify email first'
                });
            }
            return done(null, user);
        });
    } catch (error) {
        done(error, null)
    }
}));