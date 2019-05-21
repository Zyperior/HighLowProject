const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const {ensureAuthenticated} = require("../../config/authentication");



//passport.authenticate imports the strategy setup in passport.js
router.post("/login", (req, res, next) => {
    passport.authenticate("local", {
        successRedirect: "/users/testsuccess", //This connects to backend routes, how to connect to frontend routes?
        failureRedirect: "/users/testfail"
    })(req, res, next);
});

router.get("/logout", (req, res) => {
   req.logout(); //passport middleware gives this function
   res.redirect("/users/testsuccess")
});

router.get("/testsuccess", (req, res) => {
   res.send("testsuccess")
});
router.get("/testfail", (req, res) => {
    res.send("testfail")
});
router.get("/testauth", ensureAuthenticated, (req, res) => {
    res.send("testauth")
});

router.post("/register", (req, res) => {
    //If no fields are empty
    if(!req.body.userName || !req.body.email || !req.body.password){
        res.status(500).send("All fields must be entered")
    } else {

        User.findOne({userName: req.body.userName})
            .then(user => {
                if(user){
                    res.status(500).send("There is already an account with the email")
                }
                else{
                    const newUser = new User({
                        userName: req.body.userName,
                        email: req.body.email,
                        password: req.body.password
                    });

                    //bcrypt takes the password and salt and gives a hashed password in return
                    bcrypt.genSalt(10, (error, salt) => {
                        bcrypt.hash(newUser.password, salt, (error, hashedPassword) => {
                            if (error) {
                                throw error;
                            }
                            newUser.password = hashedPassword;
                            //flash stores a message in the session and displays it after a redirect
                            newUser.save()
                                .then(user => {
                                    res.redirect("/users/testsuccess")
                                })
                                .catch(error => console.log(error))
                        })
                    });

                }
            })
            .catch()
    }


});



router.get("/", (req, res) => {

});



module.exports = router;
