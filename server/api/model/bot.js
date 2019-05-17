const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let botSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    points: Number,
    gamesPlayed: Number,
    guessCounter: Number,
    correctAnswers: Number
});

module.exports = mongoose.model("Bot", botSchema);
