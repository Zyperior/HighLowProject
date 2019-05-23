const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const jwtSecret = require("../../config/jwtconfig")

//current logic. Login creates and sends a token in the response if login is successful.
//Client should use token in the header when sending requests
//save token in database that holds currently logged in users

//in before each route, do a backend check that sends in the localstaorage token, depending on role it returns if authenticated

//works with insomnia but not browser. axios.get('url',{withCrendentials:true})
//req.session.passport is undefined?
//axios.defaults.withCrendentails

//login should return a token. vue saves the token in its storage. Then vue router can do before each and check the token

router.post("/login", passport.authenticate("local"), (req, res) => {

        //if this function is called, auth was successful
        //req.user contains the authenticated user

    //make it like testauth2 so it can send back errors properly?

        console.log("logged in")

        const token = jwt.sign({id: req.body.email}, jwtSecret.secret); //secret needs to be passed in as object? passport can also use secret to decode jwt
        res.status(200).send({
           auth: true,
           token: token, //token till be sent in header, contain email and secret. contain roles too
           message: "logged in successfully"
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




//to do. change logout. keep track of logged in users to prevent logging in from multiple computers.

router.get("/logout", (req, res) => {
   //req.logout(); //only works with passport local
   res.send("logged out successfully")
});





router.post("/register", (req, res) => {
    //If no fields are empty
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
