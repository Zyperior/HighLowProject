const mongoose = require("mongoose");

let Schema = mongoose.Schema;

let questionShema = new Schema({
    question: String,
    answer: Number
});
