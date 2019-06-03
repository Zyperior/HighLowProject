const router = require("express").Router();
const passport = require("passport");
const jwt = require("jsonwebtoken");
const jwtSecret = require("../../config/jwtconfig");
const mongoose = require("mongoose");

const PendingQuestion = require("../model/PendingQuestion");
const Question = require("../model/question")


/**
 * Let logged in users suggest and send in a question.
 * The method authenticates the user to see if the person accessing this endpoint is logged in by reading the jwt token
 * and if the user is authenticated it checks that the user don't have any currently pending question because a user
 * can only have one sent in question at once until it's approved to prevent spamming. If everything is alright a new
 * pending question object is created and sent to the pending question collection in the mongo database.
 */
router.post("/", (req, res, next) => {
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

/**
 * Fetch all pending questions from the database.
 * Begin with checking if the user is an admin by reading the jwt token. If everything is okay, return all pending questions
 */
router.get("/", (req, res, next) => {
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

/**
 * Add pending questions to the used questions or remove them.
 * Check if the user doing the request is an admin by reading the jwt token, if the user is it takes the list of
 * questions and checks which to save and which to delete based on the send in admin choices.
 */
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

module.exports = router;

