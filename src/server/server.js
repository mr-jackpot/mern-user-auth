const express = require("express");
const app = express();
const port = 4000;
const config = require("./config.js");

const userSchema = require("../models/users");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser"); // bring in cookie parser
const chalk = require("chalk");
const debug = require("debug");
const log = debug("http:server");
const http = require("http");
const name = "[server.js]";
const serverLog = chalk.redBright.bold;
const greenLog = chalk.greenBright.bold;
const yellowLog = chalk.yellowBright.bold;

// Passport
const session = require("express-session");
const passport = require('passport')
const LocalStrategy =  require('passport-local').Strategy

//Database config
const db = `mongodb+srv://${config.mongoUser}:${config.mongoPassword}@${config.mongoCluster}/${config.mongoDatabase}?retryWrites=true&w=majority`;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() =>
    log(
      serverLog(
        `${name} Mongo connected @ ${config.mongoCluster}/${config.mongoDatabase}`
      )
    )
  )
  .catch((err) => log(serverLog(err)));

// **** middleware ****//
app.use((req, res, next) => {
  // Authorizing API call to come from React front end on port 3000
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();});
app.use(cookieParser());
app.use(express.urlencoded({extended: true,}));
app.use(express.json());
app.use(session({
  secret: "secret"})); // Set up express-sessions
app.use(passport.initialize()); // initialize passport + sessions
app.use(passport.session()); // initialize passport + sessions

//serialise users?
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

app.listen(port, () => {log(serverLog(`${name} running on port ${port}.`));});

passport.use(new LocalStrategy(
  function(username, password, done) {
    userSchema.findOne({ username: username }, 
      function (err, user) {
        // Handle successful or unsuccesful log
        if (err) { return done(err)}; 
        if (!user) { return done(null, false); }
        if (user.password !== password) {
          log(yellowLog(`[Password is incorrect]`))
          return done(null, false)
        }
        return done(null, user);
      }
    );
  }
));
app.post('/auth',
  passport.authenticate('local'),
    function(req, res) {
      // If this function gets called, authentication was successful.
      log(greenLog(`Authentication Successful`))
      res.redirect('/session'); // lets get the redirect to change
    })
  log(greenLog(`[Server.js] Line 72 firing`))
  ;

app.get("/session",  (req, res) => {
  //lets hide this session unless there's a cookie
  // if (!req.cookies.token) {
  if (!req.cookies.secret) {
    log(serverLog(`No cookie found`));
    return res.status(401).send("401: Unathorised access attempt");} //.send(), this should parse for a cookie
  log(greenLog(`${req.session.secret}`)) // does the secret exist
  log(greenLog('Welcome to the session page - user routed'))

  res.json()
})

// **** API Requests **** //
app.get("/", (req, res) => {
  log(serverLog(`${name} returned a response @ '/' status ${res.statusCode}`));
  log(serverLog(`We're heading '/' - the gateway to the server?`));
  res.send("Boom, you've hit the express server");
});

