const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/user');
const passport = require('passport');
const localStrategy = require('passport-local');
mongoose.connect('mongodb://localhost:27017/auth_demo', {
        useNewUrlParser: true
    })
    .then(() => console.log('You are connected!'))
    .catch(err => {
        console.log('Error ' + err);
        process.exit(1);
    });

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(require('express-session')({
    secret: 'Fuck the World!!!',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.get('/', (req, res) => res.send('home'));

app.get('/secret', (req, res) => res.render('secret'));

app.get('/register', (req, res) => res.render('register'));

app.get('/login', (req, res) => res.render('login'));

app.post('/register', (req, res) => {
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

app.post('/login', passport.authenticate('local', {
        successRedirect: '/secret',
        failureRedirect: '/login'
    }),
    (req, res) => {});

app.listen(3000, () => console.log('server is listening on port 3000'));