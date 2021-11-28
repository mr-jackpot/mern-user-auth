// Read in environment variables
const dotenv = require('dotenv');
dotenv.config();

//server setup
const express = require("express");
const app = express();

// DB setup
const mongoose = require("mongoose");

// Our Middleware 
const alogator = require('./tools/aLOGator').default;

// Sessions set up
const session = require("express-session");
const sessionStore = require('connect-mongodb-session')(session);
const cors = require('cors')
const passport = require('passport')
const router = require("./router.js");

//Database config
const db = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/${process.env.LOGIN_DB}?retryWrites=true&w=majority`;
mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() =>
    alogator('green',
        `${process.env.SERVER_NAME} Mongo connected @ ${process.env.DB_CLUSTER}/${process.env.LOGIN_DB}`
    )
  )
  .catch((err) => alogator('red', err));

const store = new sessionStore({
  uri: `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}/${process.env.SESSION_DB}?retryWrites=true&w=majority`,
  collection: 'mySessions'
}, (err) => {
  if (err) alogator('red', err);
});

store.on('error', (err) => {
  alogator('red', err);
})

app.use(cors({
  origin: `${process.env.REACT_URL}${process.env.REACT_PORT}`, // e.g. http://localhost:3000
  credentials: true
}))
app.use(express.urlencoded({extended: true,}));
app.use(express.json());
app.use(session({ //setup session middleware
  secret: require("crypto").randomBytes(16).toString('hex'),
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: 180000},
  store: store
})); 
app.use(passport.initialize()); // initialize passport + sessions
app.use(passport.session()); // initialize passport + sessions

app.listen(process.env.SERVER_PORT, () => {
  alogator("green", `${process.env.SERVER_NAME} running on port ${process.env.SERVER_PORT}.`)
});

app.use('/', router)


