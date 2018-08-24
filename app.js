// dependencies for the project
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
// requiring routes
// const passportSetup = require('./config/passport');
const authRoutes = require('./routes/auth');
const miscRoutes = require('./routes/misc');

// requiring mongoose db
const mongoose = require('mongoose');
// configure mongoose
mongoose.connect('mongodb://localhost:27017/auth_demo', {
        useNewUrlParser: true
    })
    .then(() => console.log('You are connected!'))
    .catch(err => {
        console.log('Error ' + err);
        process.exit(1);
    });

// set views template to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
// configure body parser
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use(require('express-session')({
    secret: 'Fuck the World!!!',
    resave: false,
    saveUninitialized: false
}));



// passport configs
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// middleware for requiring routes
app.use(authRoutes);
app.use(miscRoutes);

// configure port for server to listen
const port = 3000
app.listen(port, () => console.log('server is listening on port 3000'));