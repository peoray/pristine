// dependencies required for routes
const router = require('express').Router();
// const passport = require('passport');
const Joi = require('joi');
const User = require('../models/user');

const userSchema = Joi.object().keys({
    name: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
    password2: Joi.any().valid(Joi.ref('password')).required()
});

// route to sign up page
router.get('/register', (req, res) => res.render('register'));

// route to login page
router.get('/login', (req, res) => res.render('login'));

// handles user sign up
router.post('/register', async (req, res, next) => {
    try {
        //  console.log(req.body);
        const result = Joi.validate(req.body, userSchema);

        if (result.error) {
            //  req.flash
            console.log(result.error.details[0].message)
            return res.redirect('/register');
        }
        console.log('passed')

        const user = await User.findOne({
            'email': result.value.email
        });

        if (user) {
            // req.flash
            return res.redirect('/register');
        }

        // hash password
        const hash = await User.hashPassword(result.value.password);
        // console.log(hash);

        delete result.value.password2;
        result.value.password = hash;
        // console.log(result.value);
        const newUser = await new User(result.value);
        await newUser.save();
        // req.flash
        res.render('secret');

        console.log(newUser);
    } catch (error) {
        next(error);
    }
})

module.exports = router;