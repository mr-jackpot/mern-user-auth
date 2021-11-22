const env = require("./props.js");
const passport = require('passport')
const LocalStrategy =  require('passport-local').Strategy;
const alogator = require('./tools/aLOGator').default;
const userSchema = require("../models/users");

const localStrategy = new LocalStrategy(
    function(username, password, done) {
      userSchema.findOne({ username: username }, 
        function (err, user) {
          if (err) { return done(err)}; 
          if (!user) { 
            alogator('yellow', `${env.SERVER_NAME} User '${username}' does not exist in the database. Login denied.`)
            return done(null, false); }
          if (user.password !== password) {
            alogator('yellow', `${env.SERVER_NAME} User '${username}' has entered an incorrect password. Login denied.`)
            return done(null, false)
          }
          return done(null, user);
        }
      );
    }
  );

  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  module.exports = localStrategy;