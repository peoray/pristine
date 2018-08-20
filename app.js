const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/user');
// const localStrategy = require('passport-local');
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

app.use(passport.initialized());
app.use(passport.session());
passport.serializeUser(User.serializeUser);
passport.deserializeUser(User.deserializeUser);



app.get('/', (req, res) => {
    res.render('home');
});

app.get('/secret', (req, res) => {
    res.render('secret');
});

app.listen(3000, () => console.log('server is listening on port 3000'));