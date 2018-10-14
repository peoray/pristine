// dependencies required for routes
const router = require('express').Router();
const passport = require('passport');
const Joi = require('joi');
const User = require('../models/user');
const middleware = require('../middleware');
// const randomstring = require('randomstring');
// const mailer = require('../config/mailer');

// validation for user sign-up data
const userSchema = Joi.object().keys({
    name: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    password2: Joi.any().valid(Joi.ref('password')).required()
});

// route to sign up page
router.get('/register', middleware.isNotLoggedIn, (req, res) => res.render('register'));

// route to login page
router.get('/login', middleware.isNotLoggedIn, (req, res) => res.render('login'));

// handles user sign up
router.post('/register', async (req, res, next) => {
    try {
        const result = Joi.validate(req.body, userSchema);

        if (result.error) {
            req.flash('error', 'Invalid data. Please try again!');
            return res.redirect('/register');
        }

        const user = await User.findOne({
            'local.email': result.value.email
        });

        if (user) {
            req.flash('error', 'Email already exists!');
            return res.redirect('/register');
        }

        // hash password
        const hashedPassword = await User.hashPassword(result.value.password);
        delete result.value.password2;
        result.value.password = hashedPassword;
        const newUser = await new User();
        newUser.local = result.value;
        await newUser.save();
        req.flash('success', 'registered successfully');
        res.redirect('/secret');
    } catch (error) {
        next(error);
    }
});

// handles user login
router.post('/login', passport.authenticate('local', {
    successRedirect: '/secret',
    failureRedirect: '/login',
    failureFlash: true
}));

//handles user logout
router.get('/logout', middleware.isLoggedIn, (req, res) => {
    req.flash('success', 'Successfully logged out')
    req.logout();
    res.redirect('/');
});

module.exports = router;