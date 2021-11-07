const express = require("express");
const app = express();
const port = 4000;
const authenticate = require("./auth");
const config = require("./config.js");

const passport = require('passport');
const User = require("../models/users");
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

app.use(function (req, res, next) {
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
  var isAuthenticated = authenticate.verifyUser(req.body.username, req.body.password);
  if (isAuthenticated === 1) {
    log(authSuccess(`${name} User ${req.body.username} is authenticated successfully.`));
  } else {
    log(authFailure(`${name} User ${req.body.username} has not been authenticated.`));
  }
  res.json();
  log(
    serverLog(`${name} returned a response @ '/auth' status ${res.statusCode}`)
  );
});

app.listen(port, () => {
  log(serverLog(`${name} running on port ${port}.`));
});

// app.use(passport.initialize());
// app.use(passport.session());