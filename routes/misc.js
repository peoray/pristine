// dependencies required for routes
const router = require('express').Router();
const middleware = require('../middleware');

// route to home page
router.get('/', (req, res) => res.render('home'));
// route to secret page
router.get('/secret', middleware.isLoggedIn, (req, res) => {
    res.render('secret');
    console.log(req.user);
});

router.get('/verify', middleware.isNotLoggedIn, (req, res) => res.render('verify'));
// route to show render error page when route that isn't define is used
router.get('*', (req, res) => res.send('Sorry, You are fucking lost!!!'));

module.exports = router;