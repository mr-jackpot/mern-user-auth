"use strict";

// We could use typescript here to make sure the params are strings
exports.__esModule = true;
function default_1(colour, log) {
    var chalk = require("chalk");
    //Define Colours of logs
    var redLog = chalk.redBright.bold;
    var greenLog = chalk.greenBright.bold;
    var yellowLog = chalk.yellowBright.bold;
    switch (colour) {
        case "red":
            console.log(redLog(log));
            break;
        case "yellow":
            console.log(yellowLog(log));
            break;
        case "green":
            console.log(greenLog(log));
            break;
        default:
            console.log(log);
    }
}
exports["default"] = default_1;
;
