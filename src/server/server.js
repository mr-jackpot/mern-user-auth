const express = require("express");
const app = express();
const port = 4000;

const config = require("./config.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');

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

// const sessionStore = new MongoStore({
//   mongooseConnection: connection, 
//   collection: 'sessions'
// });

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
  next();
});

app.use(cookieParser());
app.use(express.urlencoded({extended: true,}));
app.use(express.json());
app.use(session({ //setup session middleware
  secret: "secret",
  resave: false,
  saveUninitialized: true,
  // store: sessionStore, we'll want to set up sessionStore with connect-mongo for production
  cookie: {maxAge: 180000},
})); // Set up express-sessions
app.use(passport.initialize()); // initialize passport + sessions
app.use(passport.session()); // initialize passport + sessions

//serialise users?
passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


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
// this was a .post...
app.post('/auth',
  passport.authenticate('local'), // we're passing passport middleware here.
    function(req, res) {
      // If this function gets called, authentication was successful.
      log(greenLog(`Authentication Successful: ${req.isAuthenticated()}`))
      // log(greenLog(req.user)) // user object from db!
      // log(greenLog(req.session.cookie)) // user object from db!
      // log(greenLog(req.isAuthenticated())) // user object from db
      // res.json() // we can pass 
      res.cookie().redirect('/protected');
      // res.redirect('/protected'); // lets get the redirect to change
    })
  log(greenLog(`[Server.js] Line 72 firing`));

app.get("/", (req, res, next) => {
  //returns a sessions cookie but doesn't log network info...
  if (req.session.viewCount) {
    req.session.viewCount++;
  } else {
    req.session.viewCount = 1;
  }
  console.log(`Here's our cookie! ${req.session}, it's been used ${req.session.viewCount} times`)
  res.status(200).send(`Here's a cookie - you have used it ${req.session.viewCount} times`)
  next();
})

// app.get("/session",  (req, res) => {
//   //lets hide this session unless there's a cookie
//   log(yellowLog('Are we authenticated here?')) // user object from db!
//   log(yellowLog(req.isAuthenticated())) // user object from db

//   // [troubleshooting] - we need to find where the cookie is stored, or is it passed into this.
//   // There is a cookie on server side, we need to set this cookie at the client end... 
//   // if (!req.cookies.token) {
//   // if (req.cookies['connect.sid']) {
//   //   log(serverLog(`Cookie found`));
//   //   res.status(401).send("401: Unathorised access attempt");} //.send(), this should parse for a cookie
  
//   log(greenLog('Welcome to the session page - user routed'))
//   res.json()
// })

// **** API Requests **** //
// app.get("/", (req, res) => {
//   log(serverLog(`${name} returned a response @ '/' status ${res.statusCode}`));
//   log(serverLog(`We're hitting '/' - the gateway to the server?`));
//   log(serverLog(req.cookies['connect.sid'])); // logs session cookie id
//   log(serverLog(req.cookies)); // logs session cookie id
//   res.send("Boom, you've hit the express server");
// });

// app.get("/protected", (req, res, next) => {
//   //returns a sessions cookie but doesn't log network info...
//   res.send('Here\'s a cookie')

// })

app.listen(port, () => {log(serverLog(`${name} running on port ${port}.`));});


// app.get("/*", function(req, res, next) {

//   if(typeof req.cookies['connect.sid'] !== 'undefined') {
//       console.log(r  eq.cookies['connect.sid']);
//   }

//   next(); // Call the next middleware
// });