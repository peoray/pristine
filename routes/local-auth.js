// dependencies required for routes
const router = require('express').Router();
const passport = require('passport');
const Joi = require('joi');
const User = require('../models/user');
const middleware = require('../middleware');
const randomstring = require('randomstring');
const mailer = require('../config/mailer');

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
        // const result = Joi.validate(req.body, userSchema);
        const result = userSchema.validate(req.body);
        
        if (result.error) {
            req.flash('error', 'Invalid data. Please try again!');
            return res.redirect('/register');
        }

        console.table(result.value)
        const user = await User.findOne({
            'email': result.value.email
        });

        if (user) {
            req.flash('error', 'Email already exists!');
            return res.redirect('/register');
        }

        // hash password
        const hashedPassword = await User.hashPassword(result.value.password);
        delete result.value.password2;
        result.value.password = hashedPassword;

        // generate secret token
        const secretToken = randomstring.generate();
        result.value.secretToken = secretToken;
        result.value.active = false;
        const newUser = await new User(result.value);
        await newUser.save();
        // compose email
        const html = `
            <h1>Hi there!</h1>
            <p>Thank you for registering</p>
            <p>Please confirm your email by copying in the token </p>
            <p>Secret Token: ${secretToken}</p>
            <p>on the following page <a href='http://localhost:3000/verify'>${req.headers.host}/verify</a></p>
            <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
            `;
        // send the email
        await mailer.sendMail('peorayy@gmail.com', result.value.email, 'Please, verify your email', html)
        req.flash('success', 'Please check your email');
        res.redirect('/verify');
    } catch (error) {
        next(error);
    }
});

// route to verify account page
router.get('/verify', middleware.isNotLoggedIn, async (req, res) => res.render('verify'));

// handles account verification
router.post('/verify', async (req, res, next) => {
    try {
        const {
            secretToken
        } = req.body;
        // check if email account matches the token
        const user = await User.findOne({
            'secretToken': secretToken
        });
        // if it doesn't
        if (!user) {
            req.flash('error', 'No User Found!');
            return res.redirect('/verify');
        }
        // if it does
        user.active = true;
        user.secretToken = '';
        await user.save();
        req.flash('success', 'You need log in now');
        res.redirect('/login');
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