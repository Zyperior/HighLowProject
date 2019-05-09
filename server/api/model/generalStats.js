const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let statsSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    gamesPlayed: Number,
    questionsAsked: Number,
    totalGuesses: Number,
});

module.exports = mongoose.model("generalStats", statsSchema);
