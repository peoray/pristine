// const router = require('express').Router();
// const passport = require('passport');

// app.get('/auth/google',
//     passport.authenticate('google', {
//         scope: ['profile']
//     }));

// app.get('/auth/google/callback',
//     passport.authenticate('google', {
//         failureRedirect: '/login'
//     }),
//     function (req, res) {
//         // Successful authentication, redirect home.
//         res.redirect('/');
//     });

// //google
// router.get('/auth/google',
//     passport.authenticate('google', {
//         scope: ['profile']
//     }));

// router.get('/auth/google/redirect', passport.authenticate('google', {
//         failureRedirect: '/login'
//     }),
//     (req, res) => {
//         // Successful authentication, redirect home.
//         res.redirect('/secret');
//     });

// // facebook
// router.get('/auth/facebook',
//     passport.authenticate('facebook', {
//         scope: ['email', 'user_likes']
//     }));

// router.get('/auth/facebook/redirect', passport.authenticate('facebook', {
//         failureRedirect: '/login'
//     }),
//     (req, res) => {
//         // Successful authentication, redirect home.
//         res.redirect('/secret');
//     });