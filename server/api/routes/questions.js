const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

let Question = require("../model/question");

router.get("/", (req, res) => {
    Question.find()
        .select("question answer difficulty category source")
        .exec()
        .then(foundquestions => res.status(200).send(foundquestions))
        .catch(error => res.status(500).json({message: error.toString()}))

});

router.get("/:amount/:difficulty/:category", (req, res) => {

    const amount = parseInt(req.params.amount);
    const difficulty = req.params.difficulty;
    const category = req.params.category;

    let query = {difficulty: difficulty, category: category};

    if(difficulty == 0 && category == 0){
        query = {};
    }
    else if(difficulty == 0){
        query = {category: category}
    }
    else if(category == 0){
        query = {difficulty: difficulty}
    }



    Question.find(query)
        //.limit(amount)
        .select("question answer difficulty category source")
        .exec()
        .then(foundquestions => {

            //Randomize which questions that are returned each time
            let scrambledQuestions = [];
            let indexes = [];
            while(scrambledQuestions.length < amount){
                const questionIndex = Math.floor(Math.random() * foundquestions.length);
                if(!indexes.includes(questionIndex)){
                    scrambledQuestions.push(foundquestions[questionIndex])
                    indexes.push(questionIndex);
                }
                //REMOVE THIS "IF" BELOW ONCE THERE ARE AT LEAST 5 QUESTIONS OF EACH DIFFICULTY IN EACH CATEGORY
                if(foundquestions < amount){
                    break;
                }
            }

            res.status(200).send(scrambledQuestions)
        })
        .catch(error => res.status(500).json({message: error.toString()}))

});


router.post("/", (req, res) => {
    let question = new Question({
        _id: new mongoose.Types.ObjectId(),
        question: req.body.question,
        answer: req.body.answer,
        source: req.body.source,
        difficulty: req.body.difficulty,
        category: req.body.category
    });

    question.save()
        .then(savedQuestion => res.status(201).send(savedQuestion))
        .catch(error => res.status(500).json({message: error.toString()}))

});



router.delete("/:id", (req, res) => {
    Question.remove({_id: req.params.id})
        .exec()
        .then(deletedQuestion => res.status(200).json({message: "Deleted question successfully"}))
        .catch(error => res.status(500).json({message: error.toString()}))
})



router.put("/:id", (req, res) => {

    Question.findOneAndUpdate({_id:req.params.id}, req.body, {new:true})
        .exec()
        .then(updatedQuestion => res.status(200).send(updatedQuestion))
        .catch(error => res.status(500).json({message: error.toString()}))

})


module.exports = router;
