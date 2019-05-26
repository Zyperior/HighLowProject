const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = require("./jwtconfig")

const db = require('../postgresDB/PGdb.js')



const User = require("../api/model/User");



module.exports = function(passport){


    passport.use("jwt", new JWTStrategy({
            jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme("JWT"),
            secretOrKey: jwtSecret.secret
        }, (jwt_payload, done) => {
            db.query('SELECT username, role, user_id FROM users WHERE username = $1', [jwt_payload.id])
                .then(foundUser => {
                    if(foundUser.rows[0]){
                        //done takes in the parameters (error, user, options)
                        done(null, foundUser.rows[0])
                    }
                    else {
                        done(null, false)
                    }
                })
                .catch(error => console.log(error))

        })
    );


};

