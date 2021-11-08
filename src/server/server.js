const express = require("express");
const app = express();
const port = 4000;
const authenticate = require("./auth");
const config = require("./config.js");

const session = require('express-session');
const passport = require('passport');
const userSchema = require("../models/users");
const mongoose = require("mongoose");
const chalk = require("chalk");
const debug = require("debug");
const log = debug("http:server");
const http = require("http");
const name = "[server.js]";
const serverLog = chalk.redBright.bold;
const authSuccess = chalk.greenBright.bold;
const authFailure = chalk.yellowBright.bold;

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

passport.use(authenticate.strategy);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser(async (email, done) => {
  try {
    let user = await userSchema.findOne(user);
    if (!user) {
      return done(new Error('user not found'));
    }
    done(null, user);
  } catch (e) {
    done(e);
  }
});

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

  next();
});

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Boom, you've hit the express server");
  log(serverLog(`${name} returned a response @ '/' status ${res.statusCode}`));
});

app.post("/auth", (req, res) => {
  app.post('/login',
  passport.authenticate('local', { successRedirect: '/' }));
});

app.listen(port, () => {
  log(serverLog(`${name} running on port ${port}.`));
});

// app.use(passport.initialize());
// app.use(passport.session());