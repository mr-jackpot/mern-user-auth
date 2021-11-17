//server setup
const env = require("./props.js");
const express = require("express");
const app = express();
const port = env.SERVER_PORT;
const http = require("http");

// DB setup
const userSchema = require("../models/users");
const mongoose = require("mongoose");

//Quality of Life
const chalk = require("chalk");
const debug = require("debug");
const log = debug("http:server");
const serverLog = chalk.redBright.bold;
const greenLog = chalk.greenBright.bold;
const yellowLog = chalk.yellowBright.bold;

// Our Middleware 
const isAuth = require('./isAuth')

// Sessions set up
const session = require("express-session");
const cors = require('cors')
const passport = require('passport')
const LocalStrategy =  require('passport-local').Strategy;

//Database config
const db = `mongodb+srv://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_CLUSTER}/${env.DB_NAME}?retryWrites=true&w=majority`;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() =>
    log(
      greenLog(
        `${env.SERVER_NAME} Mongo connected @ ${env.DB_CLUSTER}/${env.DB_NAME}`
      )
    )
  )
  .catch((err) => log(serverLog(err)));

app.use(cors({
  origin: `${env.REACT_URL}${env.REACT_PORT}`, // e.g. http://localhost:3000
  credentials: true
}))
app.use(express.urlencoded({extended: true,}));
app.use(express.json());
app.use(session({ //setup session middleware
  secret: env.SESSION_SECRET,
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
          log(yellowLog(`${env.SERVER_NAME} User '${username}' does not exist in the database. Login denied.`))
          return done(null, false); }
        if (user.password !== password) {
          log(yellowLog(`${env.SERVER_NAME} User '${username}' has entered an incorrect password. Login denied.`))
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
app.get("/authtest", isAuth(), (req, res) => {
  console.log("successful authorisation")
  res.status(200).send("Succesful login")
});

// unauthorised requests sent here by
app.get('/failure', (req, res) => {
  console.log("failed authorisation")
  res.status(200).send("Failed Login")
})


app.listen(env.SERVER_PORT, () => {log(serverLog(`${env.SERVER_NAME} running on port ${env.SERVER_PORT}.`));});
