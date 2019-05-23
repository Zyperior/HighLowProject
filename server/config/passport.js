const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtSecret = require("./jwtconfig")



const User = require("../api/model/User");



module.exports = function(passport){

    //For insomnia/postman:
    //jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
    //For axios in vue:
    //jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme("JWT")

    passport.use("jwt", new JWTStrategy({
            jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme("JWT"),
            secretOrKey: jwtSecret.secret
        }, (jwt_payload, done) => {
            User.findOne({email: jwt_payload.id})
                .then(foundUser => {
                    console.log("running jwt strategy")
                    console.log(foundUser)
                    if(foundUser){
                        console.log("jwt strategy found user in db while decoding token")
                        done(null, foundUser)
                    }
                    else {
                        console.log("jwt strategy did not find user in db while decoding token")
                        done(null, false)
                    }
                })
                .catch(error => console.log(error))
        })
    );




        passport.use( "local", new LocalStrategy({usernameField: "email"}, (email, password, done) => {
            User.findOne({email: email})
                .then(foundUser => {
                    console.log("running local strategy")
                    if(!foundUser){
                        //done takes in the parameters (error, user, options)
                        return done(null, false, {message: "email is not registered"})
                    }

                    bcrypt.compare(password, foundUser.password, (error, isMatching) => {
                        if (error){
                            throw error;
                        }
                        if(isMatching){
                            return done(null, foundUser)
                        }
                        else {
                            return done(null, false, {message: "The password is incorrect"})
                        }
                    });
                })
                .catch(error => console.log(error))
        })
    );







    //serialize and deserialize.
    //The credentials used to authenticate the user is only sent during login.
    //If authentication succeeds, a session is created and a cookie is set in the browser.
    //Each request after that look at the cookie rather than the credentials to identify the session.
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => { //deserialize only called when using postman but not browser?
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
};

