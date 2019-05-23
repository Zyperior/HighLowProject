module.exports = {
    //any route(backend route) that needs to be protected uses this
    ensureAuthenticated: function(req, res, next) {
        //
        if(req.user){ //if a user is logged in, req.user is passed with every request afterwards. Use this to check if the user is logged in
            console.log("a user is logged in")
        }
        else{
            console.log("a user is not logged in")
        }
        //

        if (req.isAuthenticated()) { //isAuthenticated is a method passport provides
            return next();
        }

        res.send("access to authenticated endpoint failed"); //if not authenticated
    },
    forwardAuthenticated: function(req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        res.redirect('/users/testauth');
    }
};