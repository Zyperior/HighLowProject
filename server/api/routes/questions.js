const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

let Question = require("../model/question");

router.get("/", (req, res) => {
    res.send("hello");
});


router.post("/", (req, res) => {
    let question = new Question({
        id: new mongoose.Types.ObjectId(),
        question: req.body.question,
        answer: req.body.answer
    });

    question.save()
        .then(savedQuestion => {
            res.status(201).json({
                message: "Created product successfully"
        })
    })


});


module.exports = router;