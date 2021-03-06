const router = require("express").Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
const jwt = require("jsonwebtoken");
const jwtSecret = require("../../config/jwtconfig");
const uuid = require('uuid')

const db = require('../../postgresDB/PGdb.js')

/**
 * Register a new user.
 * Checks that no fields are null in the request body and then looks in the database to check if a user with the
 * given username already exists. If it doesn't, it inserts a new user with the sent information as well as encrypts
 * the password.
 */
router.post("/auth/register", (req, res) => {

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
                        res.status(201).send(newUser.rows[0])
                    }).catch(err => res.status(500).send("Something went wrong, user not created"));
                }).catch(err => res.status(500).send("Something went wrong"));
            }else{
                res.status(409).send("User with that name already exists")
            }
        }).catch(err => res.status(500).send("Something went wrong"));
});


/**
 * Login a user.
 * Checks that no fields are null and then looks in the database to see if a user with the given username exists,
 * if it does bcrypt compares the two passwords. If the passwords matches a jwt token is created and sent to the client
 * which lets the client identify themselves in further requests
 */
router.post("/auth/login",  (req, res) => {

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
            }).catch(err => res.status(500).send("Something went wrong"));
    }
});

/**
 * Finds and returns a user with the given username
 */
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
    }).catch(err => {
        res.status(500).send('Something is wrong')
    })
})

/**
 * When the game completes the stats of the playing user needs to update. This methods updates the points of the
 * selected user.
 */
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
            if(!updatedUser.rows[0]){
                res.status(404).send("User not found")
            }else
                res.status(201).send(updatedUser.rows[0])
        }).catch(err => res.status(500).send("Something went wrong"));
})

/**
 * Returns the user that have the leader board rank of ":nr". The method  select the username and points from the database,
 * order the result and can then return the selected user.
 */
router.get('/top/:nr', (req, res) => {
    db.query('SELECT username, points FROM users ORDER BY points DESC LIMIT $1', [req.params.nr])
        .then(foundUsers => {
            if(!foundUsers.rows){
                res.status(200).send("No users")
            }else
                res.status(200).send(foundUsers.rows)
        }).catch(err => res.status(500).send("Something went wrong"));
})


module.exports = router;
