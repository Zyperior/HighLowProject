const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let questionShema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    question: String,
    answer: Number,
    source: String,
    difficulty: Number,
    category: Number
});

module.exports = mongoose.model("Question", questionShema);
