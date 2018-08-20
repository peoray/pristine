const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../models/user');

router.get('/register', (req, res) => res.render('register'));

router.get('/login', (req, res) => res.render('login'));

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

router.post('/login', passport.authenticate('local', {
        successRedirect: '/secret',
        failureRedirect: '/login'
    }),
    (req, res) => {});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;