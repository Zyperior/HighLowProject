const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();

let Stats = require("../model/generalStats");

router.get("/", (req, res) => {
    Stats.find()
        .select("gamesPlayed questionsAsked totalGuesses")
        .exec()
        .then(stats => res.status(200).json(stats))
        .catch(error => res.status(500).json({message : error.toString()}))
});

router.put("/", (req, res) => {

    Stats.findOneAndUpdate(
        {},
        {$inc:{gamesPlayed: 1, questionsAsked: req.body.questionsAsked,totalGuesses : req.body.totalGuesses }},
        {new:true},
        (error, response )=>{
            if(error){res.status(500).json({message : error.toString()})}
            else{res.status(200).json(response)}
        });

});

router.post("/", (req, res) => {

    Stats.countDocuments()
        .exec()
        .then(posts=>{

            if(posts == 0){
                let stats = new Stats({
                    _id: new mongoose.Types.ObjectId(),
                    gamesPlayed: req.body.gamesPlayed,
                    questionsAsked: req.body.questionsAsked,
                    totalGuesses: req.body.totalGuesses,
                });

                stats.save()
                    .then(savedStats => {
                        res.status(201).json(savedStats)
                    });

            }
            else{
                res.status(409).json({message : "Stats already exists"})
            }

        })
        .catch(error => res.status(500).json({message : error.toString()}));
});


module.exports = router;
