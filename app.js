const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require('./models/user');
const passport = require('passport');
const localStrategy = require('passport-local');
const middleware = require('./middleware');
const authRoutes = require('./routes/auth');
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

app.use(authRoutes);

app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get('/', (req, res) => res.render('home'));

app.get('/secret', middleware.isLoggedIn, (req, res) => res.render('secret'));

app.listen(3000, () => console.log('server is listening on port 3000'));