const express = require("express");
const passport = require("passport");
const isAuth = require("./isAuth");
const router = express.Router();
const alogator = require('./tools/aLOGator').default;

const localStrategy = require("./passport");
passport.use(localStrategy);

router.post("/auth", passport.authenticate("local"), function (req, res, done) {
  // If this function gets called, authentication was successful.
  alogator("green", `Authentication Successful: ${req.isAuthenticated()}`); //req.user req.session avialable here
  res.send();
});

// tests if the session is authenticated
router.get("/authtest", isAuth(), (req, res) => {
  alogator("green", "Successful authorisation");
  res.status(200).send("Succesful login");
});

router.get("/admin", isAuth(), (req, res) => {
  if (req.user.accessLevel === "owner") {
    alogator("green", "Administrator authorized");
    res.status(200).send("Administrator authorized");
  } else {
    res.redirect("/failure");
  }
});

// unauthorised requests sent here by
router.get("/failure", (req, res) => {
  alogator("red", "Failed authorisation");
  res.status(200).send("Failed Login");
});

router.get("/logout", (req, res) => {
  if (req.user.username) {
    var user = req.user.username;
    req.session.destroy();
    alogator("yellow", `User '${user}' signed out (Cookie has been crumbled)`);
  } else {
    alogator("yellow", "Client has no active session to disconnect.");
  }
});

module.exports = router;
