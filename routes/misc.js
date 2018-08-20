// dependencies required for routes
const express = require('express');
const router = express.Router();
const middleware = require('../middleware');

// route to home page
router.get('/', (req, res) => res.render('home'));
// route to secret page
router.get('/secret', middleware.isLoggedIn, (req, res) => res.render('secret'));
// route to show render error page when route that isn't define is used
router.get('*', (req, res) => res.send('Sorry, You are fucking lost!!!'));

module.exports = router;