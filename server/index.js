const express = require("express");
const mongoose = require("mongoose");

const app = express();


const questionsRouter = require("./api/routes/questions.js");
app.use("/questions", questionsRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("server started on port: " + PORT));


