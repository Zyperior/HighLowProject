const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
//const flash = require("connect-flash");
//const session = require("express-session"); //flash needs this to work

const app = express();


mongoose.connect(require("./config/databaseURI"), {useNewUrlParser: true})
    .then(() => console.log("Success connecting to the database"))
    .catch(error => console.log(error));


app.use(cors());
app.use(bodyParser.json());


// app.use(session({
//     secret: "very secret",
//     resave: false,
//     saveUninitialized: true
// }));
// app.use(flash());



const questionsRouter = require("./api/routes/questions.js");
app.use("/questions", questionsRouter);

const statsRouter = require("./api/routes/generalStats.js");
app.use("/stats", statsRouter);

const botRouter = require("./api/routes/bot.js");
app.use("/bots", botRouter);


app.use("/users", require("./api/routes/users.js"));


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log("server started on port: " + PORT));


