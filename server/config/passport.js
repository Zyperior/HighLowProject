const LocalStrategy = require("passport-local").Strategy;
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");


const User = require("../api/model/User");

module.exports = function(passport){
    passport.use(
        new LocalStrategy({usernameField: "email"}, (email, password, done) => {
            User.findOne({email: email})
                .then(foundUser => {
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

    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });
};

