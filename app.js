// dependencies for the project
const express = require('express');
const app = express();
require('dotenv').config();
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const passport = require('passport');
const cookiepParser = require('cookie-parser');
const session = require('express-session');
// var logger = require('morgan');
// const expresValidator = require('express-validator');
// const localAuthRoutes = require('./routes/local-auth');
// const miscRoutes = require('./routes/misc');
// require('./config/passport-local')(passport);
// require('./config/passport-google')(app);
// require('./config/passport-fb')(app);
// requiring mongoose db
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
// configure mongoose
mongoose.connect('mongodb://localhost:27017/auth_demo', {
        useNewUrlParser: true
    })
    .then(() => console.log('You are connected!'))
    .catch(err => {
        console.log('Error ' + err);
        process.exit(1);
    });

// app.use(logger('dev'));
app.use(cookiepParser());
// set views template to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
// configure body parser
app.use(bodyParser.urlencoded({
    extended: false
}));

// make the user available to every template
app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

// app.use(flash());
// required for passport
app.use(session({
    secret: 'ilovescotchscotchyscotchscotch',
    resave: false,
    saveUninitialized: false
})); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use((req, res, next) => {
    // res.locals.success = req.flash('success');
    // res.locals.error = req.flash('error');
    next();
})

// app.use((req, res, next) => {
//     const error = new Error('Not Found');
//     error.status = 404;
//     next(error);
// });

// app.use(ExpressValidator)

// middleware for requiring routes
app.use(require('./routes/local-auth'));
app.use(require('./routes/misc'));

// configure port for server to listen
const port = 3000;
app.listen(port, () => console.log('server is listening on port 3000'));