var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
const User = require("../models/users");

let strategy = new LocalStrategy(
  async (u, p, done) => {
    let user;
    try {
      user = await User.findOne(user);
      if (!user) {
        return done(null, false, {message: 'No user by that email'});
      }
    } catch (e) {
        return done(e);
    }
    let match  = await user.comparePassword(p);
    if (!match) {
      return done(null, false, {message: "Not a matching password."});
    }

    return done(null, user)
  }
);

module.exports = {strategy}