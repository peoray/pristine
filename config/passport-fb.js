// const passport = require('passport');
// const FacebookStrategy = require('passport-facebook').Strategy;
// const User = require('../models/user');
// require('dotenv').config();

// passport.serializeUser((user, done) => {
//     done(null, user.id);
// });

// passport.deserializeUser(async (id, done) => {
//     try {
//         await User.findById(id, (err, user) => {
//             done(err, user);
//         });
//     } catch (error) {
//         done(error, null)
//     }
// });

// passport.use(new FacebookStrategy({
//         callbackURL: "http://localhost:3000/auth/facebook/redirect",
//         clientID: process.env.FACEBOOK_APP_ID,
//         clientSecret: process.env.FACEBOOK_APP_SECRET
//     },
//     (accessToken, refreshToken, profile, done) => {
//         console.log(profile);
//         User.findOne({
//             'facebook.id': profile.id
//         }).then(currentUser => {
//             if (currentUser) {
//                 console.log('User already exists, please login');
//                 return done(null, currentUser);
//             }
//             new User({
//                 // username: profile.displayName,
//                 'facebook.id': profile.id,
//                 // 'facebook.username': profile.id
//             }).save().then(newUser => {
//                 // console.log(`You have created a new user ${newUser}`);
//                 done(null, newUser);
//             })
//         })
//     }
// ));