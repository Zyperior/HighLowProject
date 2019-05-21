module.exports = {
    //any route(backend route) that needs to be protected uses this
    ensureAuthenticated: function(req, res, next) {
        if (req.isAuthenticated()) { //isAuthenticated is a method passport provides
            console.log("success?")
            return next();
        }

        res.redirect('/users/test');
    },
    forwardAuthenticated: function(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        res.redirect('/users/testauth');
    }
};