const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

let Question = require("../model/question");

router.get("/", (req, res) => {
    Question.find()
        .select("question answer")
        .exec()
        .then(foundquestions => res.status(200).json(foundquestions))
        .catch(error => console.log(error))

});

router.get("/:amount", (req, res) => {

    Question.find()
        .limit(parseInt(req.params.amount))
        .select("question answer")
        .exec()
        .then(foundquestions => res.status(200).json(foundquestions))
        .catch(error => console.log(error))

});


router.post("/", (req, res) => {
    let question = new Question({
        _id: new mongoose.Types.ObjectId(),
        question: req.body.question,
        answer: req.body.answer
    });

    question.save()
        .then(savedQuestion => {
            res.status(201).json({
                message: "Created product successfully"
        })
        .catch(error => console.log(error))

    })


});


module.exports = router;
