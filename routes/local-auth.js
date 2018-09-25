// dependencies required for routes
const router = require('express').Router();
const passport = require('passport');
const Joi = require('joi');
const User = require('../models/user');
const middleware = require('../middleware');
const randomstring = require('randomstring');
const mailer = require('../config/mailer');


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
            req.flash('error', 'Invalid data');
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
        const hash = await User.hashPassword(result.value.password);
        // generate secret token
        const secretToken = randomstring.generate();

        result.value.secretToken = secretToken;
        result.value.active = false;

        delete result.value.password2;
        result.value.password = hash;
        const newUser = await new User();
        newUser.local = result.value;
        await newUser.save();
        // compose email
        const html = `
            <h1>Hi there!</h1>
            <p>Thank you for registering</p>
            <p>Please confirm your email by copying in the token </p>
            <p>Secret Token: ${secretToken}</p>
            <p>on the following page <a href='http://localhost:3000/verify'>${req.headers.host}</a></p>
        `;
        // send the email
        await mailer.sendMail('peoray@yahoo.com', result.value.email, 'Please, verify your email', html)
        req.flash('success', 'Please check your email');
        res.redirect('/verify');
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

router.post('/verify', async (req, res, next) => {
    try {
        const {
            secretToken
        } = req.body;
        // find account that matches the token
        const user = await User.findOne({
            'secretToken': secretToken
        });
        if (!user) {
            req.flash('error', 'No User Found!');
            return res.redirect('/register');
        }
        user.active = true;
        user.secretToken = '';
        await user.save();
        req.flash('success', 'You need log in now');
        res.redirect('/login');
    } catch (error) {
        next(error);
    }
});

//google
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

// facebook
router.get('/auth/facebook',
    passport.authenticate('facebook', {
        scope: ['email', 'user_likes']
    }));

router.get('/auth/facebook/redirect', passport.authenticate('facebook', {
        failureRedirect: '/login'
    }),
    (req, res) => {
        // Successful authentication, redirect home.
        res.redirect('/secret');
    });

//handles user logout
router.get('/logout', middleware.isLoggedIn, (req, res) => {
    req.flash('success', 'Successfully logged out')
    req.logout();
    res.redirect('/');
});

module.exports = router;