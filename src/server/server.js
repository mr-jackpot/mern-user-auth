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
      serverLog(
        `${name} Mongo connected @ ${config.mongoCluster}/${config.mongoDatabase}`
      )
    )
  )
  .catch((err) => log(serverLog(err)));

// // **** middleware ****//
// app.use((req, res, next) => {
//   // Authorizing API call to come from React front end on port 3000
  // res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, PATCH, DELETE"
//   );
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "X-Requested-With,content-type"
//   );
//   res.setHeader("Access-Control-Allow-Credentials", true);
//   next();
// });

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
    log(greenLog(`Authentication Successful: ${req.isAuthenticated()}`)) //req.user
    log(greenLog(`Authentication Successful: ${req.user}`)) //req.user
    console.log(req.session) 
    res.send()
    });


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
