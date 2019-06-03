const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");

const app = express();

app.use(cors());


app.use(bodyParser.json());

require("./config/passport")(passport);

mongoose.connect(require("./config/databaseURI"), {useNewUrlParser: true})
    .then(() => console.log("Success connecting to the database"))
    .catch(error => console.log(error));


app.use(express.urlencoded({extended: true}));


app.use(passport.initialize());
app.use(passport.session());



const questionsRouter = require("./api/routes/questions.js");
app.use("/questions", questionsRouter);

const statsRouter = require("./api/routes/generalStats.js");
app.use("/stats", statsRouter);

const botRouter = require("./api/routes/bot.js");
app.use("/bots", botRouter);


app.use("/users", require("./api/routes/users.js"));

app.use("/suggestedQuestions", require('./api/routes/suggestedQuestions'))


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("server started on port: " + PORT));
