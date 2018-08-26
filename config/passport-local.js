const express = require('express');
const app = express();
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('../models/user');

module.exports = app => {
  app.use(
    require('express-session')({
      secret: 'Fuck the World!!!',
      resave: false,
      saveUninitialized: false
    })
  );
  // passport configs
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use(new LocalStrategy(User.authenticate()));
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
};
