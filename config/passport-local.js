// const passport = require('passport');
// const LocalStrategy = require('passport-local').Strategy;
// const User = require('../models/user');

// module.exports = passport => {

//     passport.serializeUser((user, done) => {
//       done(null, user.id);
//     });

//     passport.deserializeUser((id, done) => {
//       User.findById(id, (err, user) => {
//         done(err, user);
//       });
//     });


//     passport.use('local-signup', new LocalStrategy((req, username, password, done) => {

//         process.nextTick(() => {
//           User.findOne({
//             username: username
//           }, (err, user) => {
//             if (err) {
//               return done(err);
//             }
//             if (user) {
//               return done(null, false) //req.flash('signupMessage', 'That email is already taken.'));
//             } else {

//               // if there is no user with that email
//               // create the user
//               var newUser = new User();

//               // set the user's local credentials
//               newUser.username = username;
//               newUser.password = password;

//               // save the user
//               newUser.save((err) => {
//                 if (err)
//                   throw err;
//                   return done(null, newUser);
//               });
//             }
//           })
//         })
//       }))
//     }



//       if (!user) {
//         return done(null, false, {
//           message: 'Incorrect username.'
//         });
//       }
//       if (!user.validPassword(password)) {
//         return done(null, false, {
//           message: 'Incorrect password.'
//         });
//       }
//       return done(null, user);
//     });





















//     module.exports = app => {
//       app.use(
//         require('express-session')({
//           secret: 'Fuck the World!!!',
//           resave: false,
//           saveUninitialized: false,
//           cookie: {
//             maxAge: 24 * 60 * 60 * 1000
//           }
//         })
//       );
//       // passport configs
//       app.use(passport.initialize());
//       app.use(passport.session());
//       passport.use(new LocalStrategy(User.authenticate()));
//       passport.serializeUser(User.serializeUser());
//       passport.deserializeUser(User.deserializeUser());
//     };