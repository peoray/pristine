const middleware = {}

middleware.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }
    req.flash('error', 'Sorry, You need to be logged in')
    res.redirect('/login');
}

middleware.isNotLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()) {
        req.flash('error', 'You are already logged in')
        return res.redirect('/secret')
    }
    return next();
}

module.exports = middleware;