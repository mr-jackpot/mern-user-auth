const express = require("express");
const app = express();
const port = 4000;

const encryptPassword = require('./encryptPassword')
const chalk = require('chalk')
const debug = require('debug');
const log = debug('http:server');
const http = require('http');
const name = '[server.js]';
const serverLog = chalk.redBright.bold

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

app.get("/", (req, res) => {
    res.send("Boom, you've hit the express server")
    log(serverLog(`${name} returned a response @ '/' status ${res.statusCode}`))
});

app.post("/auth", (req, res) => {
    console.log(encryptPassword.encrypt('pass'));
    res.json();
    log(serverLog(`${name} returned a response @ '/auth' status ${res.statusCode}`))
})

app.listen(port, () => {
    log(serverLog(`${name} running on port ${port}.`));
})

