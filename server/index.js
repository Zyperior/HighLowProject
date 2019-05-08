const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser")

const app = express();

mongoose.connect('mongodb+srv://abc123:123abc@cluster0-zev5e.mongodb.net/test?retryWrites=true', {useNewUrlParser: true});



app.use(bodyParser.json());

const questionsRouter = require("./api/routes/questions.js");
app.use("/questions", questionsRouter);




const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("server started on port: " + PORT));


