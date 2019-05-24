const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const jwtSecret = require("../../config/jwtconfig");



router.post("/register", (req, res) => {

    if(!req.body.username || !req.body.password){
        res.status(400).send("All fields must be entered");
    }
    else {
        User.findOne({username: req.body.username})
            .then(foundUser => {
                if(foundUser){
                    res.status(409).send("The username is already taken")
                }
                else{
                    const newUser = new User({
                        username: req.body.username,
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
            .catch(error => console.log(error));
    }
});



router.post("/login",  (req, res) => {

    if(!req.body.username || !req.body.password){
        res.status(400).send("All fields must be entered");
    }
    else {
        User.findOne({username: req.body.username})
            .then(foundUser => {
                if(!foundUser){
                    res.status(404).send("No user with that username was found");
                }
                else {
                    bcrypt.compare(req.body.password, foundUser.password, (error, isMatching) => {
                        if (error) {
                            throw error;
                        }
                        if(isMatching){
                            //secret must be the same as the one used to decrypt the token in passport.js
                            const token = jwt.sign({id: req.body.username}, jwtSecret.secret);
                            res.status(200).send({
                                token: token,
                                viewAdminPages: foundUser.role === "ADMIN"
                            });
                        }
                        else {
                            res.status(404).send("Password is incorrect");
                        }
                    });
                }
            })
            .catch(error => console.log(error))
    }
});


router.get("/auth-test-logged-in", (req, res, next) => {
    passport.authenticate("jwt", {session: false}, (error, user) => {
        //This code runs if the authentication in passport.js was successful
        if(user !== false){
            res.status(200).send("Authentication successful")
        }
        else{
            res.status(401).send("Authentication failed")
        }
    })(req, res, next);
});


router.get("/auth-test-logged-in-admin", (req, res, next) => {
    passport.authenticate("jwt", {session: false}, (error, user) => {
        if(user !== false && user.role === "ADMIN"){
            res.status(200).send("Authentication successful")
        }
        else{
            res.status(401).send("Authentication failed")
        }
    })(req, res, next);
});





router.get("/logout", (req, res) => {
   //vue clears local storage at logout in the frontend. Maybe/maybe not need backend logout.
   res.send("todo")
});







module.exports = router;
