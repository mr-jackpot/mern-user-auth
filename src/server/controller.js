const alogator = require("./tools/aLOGator").default;

const isAdmin = (req, res) => {
  if (req.user.accessLevel === "owner") {
    alogator("green", "Administrator authorized");
    res.send("Administrator authorized").status(200);
    res.redirect("/session")
  } else {
    res.redirect("/failure");
  }
};

const failureResponse = (req, res) => {
  alogator("red", "Failed authorisation");
  res.send("Failed Login").status(200);
};

const successResponse = (req, res) => {
  alogator("green", "Successful authorisation");
  res.send("Succesful login").status(200);
};

const destroySession = (req, res) => {
  if (req.user.username) {
    var user = req.user.username;
    req.session.destroy();
    alogator("yellow", `User '${user}' signed out (Cookie has been crumbled)`);
  } else {
    alogator("yellow", "Client has no active session to disconnect.");
  }
};

module.exports = { isAdmin, failureResponse, successResponse, destroySession };
