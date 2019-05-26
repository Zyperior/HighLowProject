const mongoose = require("mongoose");

const PendingQuestionSchema = new mongoose.Schema({
    suggestedBy: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true
    },
    answer: {
        type: Number,
        required: true
    },
    source: {
        type: String,
        required: true,
    },
    difficulty: {
        type: Number,
        required: true,
    },
    category: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model("PendingQuestion", PendingQuestionSchema);
