//server setup
const env = require("./props.js");
const express = require("express");
const app = express();

// DB setup
const mongoose = require("mongoose");

// Our Middleware 
const isAuth = require('./isAuth')
const alogator = require('./tools/aLOGator').default;

// Sessions set up
const session = require("express-session");
const sessionStore = require('connect-mongodb-session')(session);
const cors = require('cors')
const passport = require('passport')
const localStrategy = require('./passport');

//Database config
const db = `mongodb+srv://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_CLUSTER}/${env.LOGIN_DB}?retryWrites=true&w=majority`;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() =>
    alogator('green',
        `${env.SERVER_NAME} Mongo connected @ ${env.DB_CLUSTER}/${env.LOGIN_DB}`
    )
  )
  .catch((err) => alogator('red', err));

const store = new sessionStore({
  uri: `mongodb+srv://${env.DB_USER}:${env.DB_PASSWORD}@${env.DB_CLUSTER}/${env.SESSION_DB}?retryWrites=true&w=majority`,
  collection: 'mySessions'
}, (err) => {
  if (err) alogator('red', err);
});

store.on('error', (err) => {
  alogator('red', err);
})

app.use(cors({
  origin: `${env.REACT_URL}${env.REACT_PORT}`, // e.g. http://localhost:3000
  credentials: true
}))
app.use(express.urlencoded({extended: true,}));
app.use(express.json());
app.use(session({ //setup session middleware
  secret: env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 180000},
  store: store
})); 
app.use(passport.initialize()); // initialize passport + sessions
app.use(passport.session()); // initialize passport + sessions
passport.use(localStrategy);

// *** Routes ***//
app.post('/auth',
  passport.authenticate('local'),
  function(req, res, done) {
    // If this function gets called, authentication was successful.
    alogator("green", `Authentication Successful: ${req.isAuthenticated()}`) //req.user req.session avialable here
    res.send()
    });

// tests if the session is authenticated
app.get("/authtest", isAuth(), (req, res) => {
  alogator("green" , "Successful authorisation")
  res.status(200).send("Succesful login")
});

app.get("/admin", isAuth(), (req, res) => {
  if (req.user.accessLevel === 'owner') {
    alogator("green" , "Administrator authorized");
    res.status(200).send("Administrator authorized")
  } else {
    res.redirect('/failure')
  }
});

// unauthorised requests sent here by
app.get('/failure', (req, res) => {
  alogator("red" , "Failed authorisation")
  res.status(200).send("Failed Login")
})

app.listen(env.SERVER_PORT, () => {
  alogator("green", `${env.SERVER_NAME} running on port ${env.SERVER_PORT}.`)
});
