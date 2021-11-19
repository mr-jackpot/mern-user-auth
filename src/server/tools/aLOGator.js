const chalk = require("chalk");

//Define Colours of logs
const redLog = chalk.redBright.bold;
const greenLog = chalk.greenBright.bold;
const yellowLog = chalk.yellowBright.bold;

// We could use typescript here to make sure the params are strings
const aLOGator = (colour, log) => {
    switch(colour){
        case "red":
            console.log(redLog(log))
            break;
        case "yellow":
            console.log(yellowLog(log))
            break;
        case "green":
            console.log(greenLog(log))
            break;
        default:
            console.log(log)
    }
  };
  
exports.aLOGator = aLOGator;