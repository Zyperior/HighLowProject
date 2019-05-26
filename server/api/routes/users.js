const router = require("express").Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const jwtSecret = require("../../config/jwtconfig");
const mongoose = require("mongoose");

const User = require("../model/User");
const PendingQuestion = require("../model/PendingQuestion");
const Question = require("../model/question")



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



//todo move the suggest question related endpoints to its own route file and then improve url names

router.post("/suggest-question", (req, res, next) => {
    passport.authenticate("jwt", {session: false}, (error, user) => {
        //This code runs if the authentication in passport.js was successful
        if(user !== false){
            PendingQuestion.findOne({suggestedBy: user.username})
                .then(foundPendingQuestion => {
                    if(foundPendingQuestion){
                        res.status(409).send("This user already have a question waiting for approval")
                    }
                    else{
                        const newPendingQuestion = new PendingQuestion({
                            suggestedBy: user.username,
                            question: req.body.questionFields.question,
                            answer: req.body.questionFields.answer,
                            source: req.body.questionFields.source,
                            difficulty: req.body.questionFields.difficulty,
                            category: req.body.questionFields.category
                        });
                        newPendingQuestion.save()
                            .then(() => res.status(201).send("Question sent and waiting for approval"))
                            .catch((error) => console.log(error))
                    }
                })
                .catch(error => console.log(error));
        }
        else{
            res.status(401).send("Authentication failed")
        }
    })(req, res, next);
});


router.get("/suggested-questions", (req, res, next) => {
    passport.authenticate("jwt", {session: false}, (error, user) => {
        if(user !== false && user.role === "ADMIN"){
            PendingQuestion.find()
                .then(allPendingQuestions => {
                    res.status(200).send(allPendingQuestions)
                })
                .catch(error => console.log(error))

        }
        else{
            res.status(401).send("Authentication failed")
        }
    })(req, res, next);
});


router.post("/accept-or-deny-pending-questions", (req, res, next) => {
    passport.authenticate("jwt", {session: false}, (error, user) => {
        if(user !== false && user.role === "ADMIN"){
            req.body.questions.forEach(question => {
                PendingQuestion.findOneAndDelete({suggestedBy: question.suggestedBy})
                    .then(() => {
                        if(question.acceptOrDeny === "Accept"){
                            let newQuestion = new Question({
                                _id: new mongoose.Types.ObjectId(),
                                question: question.question,
                                answer: question.answer,
                                source: question.source,
                                difficulty: question.difficulty,
                                category: question.category
                            });
                            newQuestion.save()
                                .then(() => res.status(200).send("success"))
                                .catch(error => console.log(error))
                        }
                    })
                    .catch(error => console.log(error))

            })
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



//Authentication tests to test things work like it should
router.get("/auth-test-logged-in-user", (req, res, next) => {
    passport.authenticate("jwt", {session: false}, (error, user) => {
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




module.exports = router;
