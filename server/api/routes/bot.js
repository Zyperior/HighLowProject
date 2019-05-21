const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

let Bot = require("../model/bot");

router.get("/", (req, res) => {
    Bot.find()
        .select("name points gamesPlayed guessCounter correctAnswers")
        .exec()
        .then(stats => res.status(200).send(stats))
        .catch(error => res.status(500).json({message : error.toString()}))
});

router.get("/:name", (req, res) => {

    const name = req.params.name;

    let query = {name : name};

    Bot.find(query)
        .select("name points gamesPlayed guessCounter correctAnswers")
        .exec()
        .then(bot => res.status(200).send(bot))
        .catch(error => res.status(500).json({message : error.toString()}))
});

router.put("/", (req, res) => {

    Bot.findOneAndUpdate(
        {name : req.body.name},
        {$inc:{points: req.body.points, gamesPlayed: req.body.gamesPlayed, guessCounter: req.body.guessCounter, correctAnswers : req.body.correctAnswers }},
        {new:true},
        (error, response )=>{
            if(error){res.status(500).json({message : error.toString()})}
            else{res.status(200).send(response)}
        });

});

router.post("/", (req, res) => {

    const name = req.body.name;
    let query = {name : name};

    Bot.findOne(query)
        .exec()
        .then(bot=>{

            if(bot){
                res.status(409).json({message : "Bot with this name already exists"})
            }
            else{
                let stats = new Bot({
                    _id: new mongoose.Types.ObjectId(),
                    name: name,
                    points: 0,
                    gamesPlayed: 0,
                    guessCounter: 0,
                    correctAnswers: 0
                });

                stats.save()
                    .then(savedBot => {
                        res.status(201).send(savedBot)
                    });
            }

        })
        .catch(error => res.status(500).json({message : error.toString()}));
});


module.exports = router;
