const express = require("express");
const passport = require("passport");
const isAuth = require("./isAuth");
const router = express.Router();
const userController = require('./controller');
const localStrategy = require("./passport");

passport.use(localStrategy);

// authenticates the user and sends a cookie to validate their session
router.post("/auth", passport.authenticate("local"), userController.successResponse()););

// tests if the session is authenticated
router.get("/authtest", isAuth(), userController.successResponse());

// tests if the user has administrator access
router.get("/admin", isAuth(), userController.isAdmin());

// failed authorization gets routed to /failure
router.get("/failure", userController.failureResponse());

// destroys cookie and logs out the user
router.get("/logout", userController.destroySession());

module.exports = router;
