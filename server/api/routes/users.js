const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const {ensureAuthenticated} = require("../../config/authentication");
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

        console.log("logged in")

        const token = jwt.sign({id: req.body.email}, jwtSecret.secret); //secret needs to be passed in as object? passport can also use secret to decode jwt
        res.status(200).send({
           auth: true,
           token: token, //token till be sent in header, contain email and secret. contain roles too
           message: "logged in successfully"
        });

    });


router.get("/testauth2", (req, res, next) => {
    passport.authenticate("jwt", {session: false}, (error, user) => {
        console.log("testauth2 success")
        //console.log(user)
        //if success. do it in the way that the user is returned and then check if the user is authorized
        if(user !== false){
            console.log("SENDING TRUE")
            res.status(200).send({
                isAuthenticated: true,
                message: "testauth2 success"
            })
        }
        else{
            console.log("SENDING FALSE")
            res.send({
                isAuthenticated: false,
                message: "not logged in or authenticated"
            })
        }

    })(req, res, next);
});


// router.get("/testauth2", passport.authenticate("jwt", {session: false}), function(req, res) {
//     console.log("testauth2 success")
//     //if success. do it in the way that the user is returned and then check if the user is authorized
//     res.status(200).send({
//         auth: true,
//         message: "testauth2 success"
//     })
// });




router.get("/logout", (req, res) => {
   req.logout(); //passport middleware gives this function
   res.send("logged out successfully")
});

// router.get("/testsuccess", (req, res) => {
//    res.send("testsuccess")
// });
// router.get("/testfail", (req, res) => {
//     res.send("testfail")
// });
router.get("/testauth", ensureAuthenticated, (req, res) => {
    res.send("access to authenticated endpoint successful")
});

//
// router.get("/testauth2", (req, res, next) => {
//    passport.authenticate("customNameJWT", {session: false}, (error, user, info) => {
//        if(error){
//            console.log(error);
//        }
//        else {
//            console.log("no error")
//            res.status(200).send({
//                auth: true,
//                message: "testauth2 success"
//            })
//        }
//    })
// });






router.post("/register", (req, res) => {
    //If no fields are empty
    if(/*!req.body.userName || */!req.body.email || !req.body.password){
        res.status(500).send("All fields must be entered")
    } else {

        User.findOne({email: req.body.email})
            .then(user => {
                if(user){
                    res.status(500).send("There is already an account with the email")
                }
                else{
                    const newUser = new User({
                        //userName: req.body.userName,
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
                                    res.send("Registration successful, you can now login")
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
