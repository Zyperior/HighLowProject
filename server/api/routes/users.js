const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const jwtSecret = require("../../config/jwtconfig")

//Todo
// also have collection in db about currently logged in users so it's not possible to log in from multiple computers at once? tie the login and logout to this
// look up how jwt expire work. add?
// create profile page that knows the user's name by adding a vue mounted method and some database call using the token?
// how does vue components behave when accessed from multiple logged in computers at once that all want their unique data in the component?
// probably put the server on the cloud to easier test this
// logout button works but gives no visual feedback about that something happened
// depending on how vue behaves with multiple logged in computers at once, let the login page only be visible if the user is not logged in (and similar things)
// login probably don't need passport local anymore with all new changes, refactor backend code
// remove code that isn't used anymore. some things in index.js?
// add extra things like email verification?
// when starting a game, use the logged in user's name. tie the specific logged in users to stats and such things
// register checks that the email isn't taken, also check that the username isn't taken



router.post("/login", passport.authenticate("local"), (req, res) => {
        //secret must be the same as the one used to decrypt the token in passport.js
        const token = jwt.sign({id: req.body.email}, jwtSecret.secret);
        res.status(200).send({
           token: token,
        });

    });


router.get("/authenticate", (req, res, next) => {
    passport.authenticate("jwt", {session: false}, (error, user) => {
        //This code runs if the authentication in passport.js was successful
        if(user !== false){
            res.status(200).send({
                isLoggedIn: true,
                authRole: user.role
            })
        }
        else{
            res.send({
                isLoggedIn: false,
            })
        }
    })(req, res, next);
});




router.get("/logout", (req, res) => {
   //req.logout(); //passport local thing. cookies. not needed anymore
   res.send("todo")
});


//put this in some passport thing or remove the login from passport. local strategy not needed anymore
router.post("/register", (req, res) => {
    //If no fields are empty or null
    if(!req.body.username || !req.body.email || !req.body.password){
        res.status(500).send("All fields must be entered") //fix better status codes
    } else {

        User.findOne({email: req.body.email})
            .then(user => {
                if(user){
                    res.status(500).send("There is already an account with that email")
                }
                else{
                    const newUser = new User({
                        username: req.body.username,
                        email: req.body.email,
                        password: req.body.password,
                        role: "USER"
                    });


                    //bcrypt takes the password and salt and gives a hashed password in return
                    bcrypt.genSalt(10, (error, salt) => {
                        bcrypt.hash(newUser.password, salt, (error, hashedPassword) => {
                            if (error) {
                                throw error;
                            }
                            newUser.password = hashedPassword;
                            newUser.save()
                                .then(() => {
                                    res.status(201).send("Registration successful")
                                })
                                .catch(error => console.log(error))
                        })
                    });

                }
            })
            .catch()
    }


});



module.exports = router;
