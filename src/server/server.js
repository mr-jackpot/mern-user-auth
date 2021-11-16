//server setup
const express = require("express");
const app = express();
const port = 4000;
const http = require("http");

// DB setup
const userSchema = require("../models/users");
const mongoose = require("mongoose");
const config = require("./config.js");

//Quality of Life
const chalk = require("chalk");
const debug = require("debug");
const log = debug("http:server");
const name = "[server.js]";
const serverLog = chalk.redBright.bold;
const greenLog = chalk.greenBright.bold;
const yellowLog = chalk.yellowBright.bold;

// Sessions set up
const session = require("express-session");
const cors = require('cors')
const passport = require('passport')
const LocalStrategy =  require('passport-local').Strategy;

//Database config
const db = `mongodb+srv://${config.mongoUser}:${config.mongoPassword}@${config.mongoCluster}/${config.mongoDatabase}?retryWrites=true&w=majority`;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() =>
    log(
      greenLog(
        `${name} Mongo connected @ ${config.mongoCluster}/${config.mongoDatabase}`
      )
    )
  )
  .catch((err) => log(serverLog(err)));

app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true
}))
app.use(express.urlencoded({extended: true,}));
app.use(express.json());
app.use(session({ //setup session middleware
  secret: "secret",
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 180000}
})); 
app.use(passport.initialize()); // initialize passport + sessions
app.use(passport.session()); // initialize passport + sessions

passport.use(new LocalStrategy(
  function(username, password, done) {
    userSchema.findOne({ username: username }, 
      function (err, user) {
        if (err) { return done(err)}; 
        if (!user) { 
          log(yellowLog(`${name} User '${username}' does not exist in the database. Login denied.`))
          return done(null, false); }
        if (user.password !== password) {
          log(yellowLog(`${name} User '${username}' has entered an incorrect password. Login denied.`))
          return done(null, false)
        }
        return done(null, user);
      }
    );
  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

// *** Routes ***//
app.post('/auth',
  passport.authenticate('local'),
  function(req, res, done) {
    // If this function gets called, authentication was successful.
    log(greenLog(`Authentication Successful: ${req.isAuthenticated()}`)) //req.user req.session avialable here
    res.send()
    });


// tests if the session is authenticated
app.get("/authtest", (req, res) => {
  if (!req.isAuthenticated()) {
    res.redirect('/failure')
  } else {
    res.redirect('/success')
  }
});

app.get('/success', (req, res) => {
  console.log("successful authorisation")
  res.status(200).send("Succesful login")
})

app.get('/failure', (req, res) => {
  console.log("failed authorisation")
  res.status(200).send("Failed Login")
})


app.listen(port, () => {log(serverLog(`${name} running on port ${port}.`));});
