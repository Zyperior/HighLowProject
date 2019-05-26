const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = require("./jwtconfig")



const User = require("../api/model/User");



module.exports = function(passport){


    passport.use("jwt", new JWTStrategy({
            jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme("JWT"),
            secretOrKey: jwtSecret.secret
        }, (jwt_payload, done) => {
            User.findOne({username: jwt_payload.id})
                .then(foundUser => {
                    if(foundUser){
                        //done takes in the parameters (error, user, options)
                        done(null, foundUser)
                    }
                    else {
                        done(null, false)
                    }
                })
                .catch(error => console.log(error))
        })
    );


};

