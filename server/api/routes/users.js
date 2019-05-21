const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcryptjs");



router.get("/login", (req, res) => {
    res.send("login")
});

router.post("/register", (req, res) => {
    //If no fields are empty
    if(!req.body.userName || !req.body.email || !req.body.password){
        res.status(500).send("All fields must be entered")
    } else {

        User.findOne({email: req.body.email})
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
                                    res.redirect("/users/login")
                                })
                                .catch(error => console.log(error))
                        })
                    });

                }
            })
            .catch()
    }


});


//Get all users. Using this for testing.
router.get("/", (req, res) => {

});



module.exports = router;
