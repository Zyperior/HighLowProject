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



    //     //not necessarily needed anymore since not relying on cookies anymore. refactor code.
    //     passport.use( "local", new LocalStrategy({usernameField: "email"}, (email, password, done) => {
    //         User.findOne({email: email})
    //             .then(foundUser => {
    //                 if(!foundUser){
    //                     return done(null, false, {message: "email is not registered"})
    //                 }
    //
    //                 bcrypt.compare(password, foundUser.password, (error, isMatching) => {
    //                     if (error){
    //                         throw error;
    //                     }
    //                     if(isMatching){
    //                         return done(null, foundUser)
    //                     }
    //                     else {
    //                         return done(null, false, {message: "The password is incorrect"})
    //                     }
    //                 });
    //             })
    //             .catch(error => console.log(error))
    //     })
    // );





    // //cookie stuff. local strategy. session
    // passport.serializeUser((user, done) => {
    //     done(null, user.id);
    // });
    //
    // passport.deserializeUser((id, done) => {
    //     User.findById(id, (err, user) => {
    //         done(err, user);
    //     });
    // });
};

