// dependencies required for routes
const router = require('express').Router();
const passport = require('passport');
const User = require('../models/user');

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

// Social hanglers

router.get('/auth/google', (req, res) => {
    res.send('You are connected to Google!');
});

module.exports = router;