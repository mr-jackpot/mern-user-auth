const express = require("express");
const app = express();
const port = 4000;

const debug = require('debug');
const log = debug('http:server');
const http = require('http');
const name = '[server.js]';

log('Starting: ', name);

app.get("/", (req, res) => res.send("Boom, you've hit the express server"));

app.listen(port, () => {
    log(`${name} listening on port ${port}.`);
})