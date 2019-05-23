const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require('express-session');
const passport = require('passport');

// Passport config
require('./config/passport')(passport);

const cors = require("cors");

const app = express();

//DB Config
const db = require('./config/keys').MongoURI;

//Connect to Mongo
mongoose.connect(db, {useNewUrlParser: true})
    .then(()=> console.log('MongoDB Connected...'))
    .catch(error => console.log(error));


app.use(cors());
app.use(bodyParser.json());

// Express session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

const questionsRouter = require("./api/routes/questions.js");
app.use("/questions", questionsRouter);

const statsRouter = require("./api/routes/generalStats.js");
app.use("/stats", statsRouter);

const botRouter = require("./api/routes/bot.js");
app.use("/bots", botRouter);

const userRouter = require("./api/routes/users.js");
app.use("/users", userRouter);


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("server started on port: " + PORT));


