const router = require("express").Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const jwtSecret = require("../../config/jwtconfig");
const mongoose = require("mongoose");
const uuid = require('uuid')

const db = require('../../postgresDB/PGdb.js')

const User = require("../model/User");
const PendingQuestion = require("../model/PendingQuestion");
const Question = require("../model/question")



router.post("/register", (req, res) => {
    console.log(req.body)
    console.log("wow")
    if(!req.body.username || !req.body.password || !req.body.email){
        res.status(400).send("All fields must be entered");
    }

    db.query('SELECT * FROM users WHERE username = $1', [req.body.username])
        .then(user => {
            if(!user.rows[0]){
                bcrypt.hash(req.body.password, bcrypt.genSaltSync(5)).then(hash => {
                    db.query('INSERT INTO users VALUES($1, $2, $3, $4, $5) RETURNING *', [
                        uuid.v4(),
                        req.body.username,
                        hash,
                        req.body.email,
                        req.body.role
                    ]).then(newUser => {
                        console.log("do something here")
                        res.status(201).send(newUser.rows[0])
                    }).catch(err => console.log(err));
                }).catch(err => console.log(err));
            }else{
                console.log("why i am i here???")
                res.status(409).send("User with that name already exists")
            }
        }).catch(err => console.log(err));
});



router.post("/login",  (req, res) => {

    if(!req.body.username || !req.body.password){
        res.status(400).send("All fields must be entered");
    }
    else {
        db.query('SELECT * FROM users WHERE username = $1', [req.body.username])
            .then(foundUser => {
                if(!foundUser.rows[0]){
                    res.status(404).send("No user with that username was found");
                }else{
                    bcrypt.compare(req.body.password, foundUser.rows[0].password, (error, isMatching) => {
                        if (error) {
                            throw error;
                        }
                        if(isMatching){
                            //secret must be the same as the one used to decrypt the token in passport.js
                            const token = jwt.sign({id: req.body.username}, jwtSecret.secret);
                            console.log(foundUser.rows[0])
                            console.log("wow")
                            res.status(200).send({
                                token: token,
                                viewAdminPages: foundUser.rows[0].role === "ADMIN",
                                user: {
                                    username: foundUser.rows[0].username,
                                    points: foundUser.rows[0].points,
                                    gamesplayed: foundUser.rows[0].gamesplayed,
                                    gameswon: foundUser.rows[0].gameswon,
                                    totalguesses: foundUser.rows[0].totalguesses,
                                    correctguesses: foundUser.rows[0].correctguesses
                                }
                            });
                        }
                        else {
                            res.status(404).send("Password is incorrect");
                        }
                    });
                }
            }).catch(err => {
                console.log(err);
        })
    }
});

router.get('/:username', (req, res) => {
    db.query(`SELECT username, 
              totalguesses, points, 
              correctguesses, gamesplayed, role
              FROM users 
              WHERE username = $1`, [req.params.username]).then(foundUser => {
                  if(!foundUser.rows[0]){
                      res.status(404).send('User not found')
                  }else{
                      res.status(200).send(foundUser.rows[0])
                  }
    }).catch(err => res.status(500).send('Something is wrong'))
})

router.put('/:username', (req, res) => {
    db.query(`UPDATE users SET
               totalguesses = totalguesses + $2,
               points = points + $3,
               correctguesses = correctguesses + $4,
               gamesplayed = gamesplayed + 1
               WHERE username = $1
               RETURNING username, totalguesses, points, correctguesses, gamesplayed`,
               [req.params.username, req.body.totalguesses, req.body.points, req.body.correctguesses])
        .then(updatedUser => {
            console.log(updatedUser.rows[0])
            console.log("wow")
            if(!updatedUser.rows[0]){
                res.status(404).send("User not found")
            }else
                res.status(201).send(updatedUser.rows[0])
        }).catch(err => console.log(err));
})

router.get('/top/:nr', (req, res) => {
    db.query('SELECT username, points FROM users ORDER BY points LIMIT $1', [req.params.nr])
        .then(foundUsers => {
            console.log(foundUsers)
            if(!foundUsers.rows){
                res.status(200).send("No users")
            }else
                res.status(200).send(foundUsers.rows)
        }).catch(err => {
            console.log(err);
    })
})


router.get("/logout", (req, res) => {
    //vue clears local storage at logout in the frontend. Maybe/maybe not need backend logout.
    res.send("todo")
});



//Authentication tests to test things work like it should
router.get("/auth-test-logged-in-user", (req, res, next) => {
    passport.authenticate("jwt", {session: false}, (error, user) => {
        if(user !== false){
            res.status(200).send("Authentication successful")
        }
        else{
            res.status(401).send("Authentication failed")
        }
    })(req, res, next);
});

router.get("/auth-test-logged-in-admin", (req, res, next) => {
    passport.authenticate("jwt", {session: false}, (error, user) => {
        if(user !== false && user.role === "ADMIN"){
            res.status(200).send("Authentication successful")
        }
        else{
            res.status(401).send("Authentication failed")
        }
    })(req, res, next);
});




module.exports = router;
