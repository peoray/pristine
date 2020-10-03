// dependencies for the project
const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
var logger = require('morgan');
require('./config/passport-local');
require('./config/passport-google');
require('./config/passport-fb');

// requiring mongoose db
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// configure mongoose
mongoose.connect('mongodb://localhost:27017/auth_demo', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    })
    .then(() => console.log('You are connected!'))
    .catch(err => {
        console.log('Error ' + err);
        process.exit(1);
    });

app.use(logger('dev'));
app.use(cookieParser());
// set views template to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
// configure body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

// required for passport
app.use(session({
    secret: 'FUCK LOVE!!!',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    }
})); 

app.use(flash());
app.use(passport.initialize());
app.use(passport.session()); 

// make the user available to every template and the flash messages
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    next();
});

// middleware for requiring routes
app.use(require('./routes/local-auth'));
app.use(require('./routes/social-auth'));
app.use(require('./routes/misc'));

// configure port for server to listen
app.listen(process.env.PORT, () => console.log('server is listening on port 3000'));