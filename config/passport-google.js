// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
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

// // passport configs
// passport.use(
//     new GoogleStrategy({
//             callbackURL: '/auth/google/redirect',
//             clientID: process.env.GOOGLE_CLIENT_ID,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET
//         },
//         (accessToken, refreshToken, profile, done) => {
//             console.log(profile);
//             User.findOne({
//                 'google.id': profile.id
//             }).then(currentUser => {
//                 if (currentUser) {
//                     console.log('User already exists, please login');
                    
//                     return done(null, currentUser);
//                 }
//                 new User({
//                     // username: profile.displayName,
//                     'google.id': profile.id,
//                     'google.username': profile.gender

//                 }).save().then(newUser => {
//                     // console.log(`You have created a new user ${newUser}`);
//                     done(null, newUser);
//                 })
//             })
//         }
//     ));