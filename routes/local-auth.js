// dependencies required for routes
const router = require('express').Router();
const passport = require('passport');
const User = require('../models/user');

// middleware to check
// const isLoggedIn = (req, res, next) => {
//     if (req.user) {
//         return next();
//     }
//     res.redirect('/login');
// }

// route to sign up page
router.get('/register', (req, res) => res.render('register'));

// route to login page
router.get('/login', (req, res) => res.render('login'));

//handles user sign up
router.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    User.register(new User({
        username
    }), password, (err, user) => {
        if (err) {
            console.log(err);
            return res.render('register');
        }
        passport.authenticate('local')(req, res, () => {
            res.redirect('/secret');
        });
    })
});

//handles user login
router.post('/login', passport.authenticate('local', {
        successRedirect: '/secret',
        failureRedirect: '/login'
    }),
    (req, res) => {});

//handles user logout
router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

// Social handlers

router.get('/auth/google',
    passport.authenticate('google', {
        scope: ['profile']
    }));

router.get('/auth/google/redirect', passport.authenticate('google', {
        failureRedirect: '/login'
    }),
    (req, res) => {
        // Successful authentication, redirect home.
        res.redirect('/secret');
    });

module.exports = router;