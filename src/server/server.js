const express = require("express");
const app = express();
const port = 4000;

const chalk = require('chalk')
const debug = require('debug');
const log = debug('http:server');
const http = require('http');
const name = '[server.js]';
const serverLog = chalk.redBright.bold

app.get("/", (req, res) => {
    res.send("Boom, you've hit the express server")
    log(serverLog(`${name} returned a response @ '/'`))
});

app.listen(port, () => {
    log(serverLog(`${name} running on port ${port}.`));
})