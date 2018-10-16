// const router = require('express').Router();
// const passport = require('passport');

//google
// app.get('/auth/google',
//     passport.authenticate('google', {
//         scope: ['profile']
//     }));


// router.get('/auth/google/redirect', passport.authenticate('google', {
//         failureRedirect: '/login'
//     }),
//     (req, res) => {
        // Successful authentication, redirect to secret
//         res.redirect('/secret');
//     });

// facebook
// router.get('/auth/facebook',
//     passport.authenticate('facebook', {
//         scope: ['email', 'user_likes']
//     }));

// router.get('/auth/facebook/redirect', passport.authenticate('facebook', {
//         failureRedirect: '/login'
//     }),
//     (req, res) => {
        // Successful authentication, redirect home.
//         res.redirect('/secret');
//     });