const alogator = require("./tools/aLOGator").default;

const isAdmin = (req, res) => {
  if (req.user.accessLevel === "owner") {
    alogator("green", "Administrator authorized");
    res.status(200).send("Administrator authorized");
  } else {
    res.redirect("/failure");
  }
};

const failureResponse = (req, res) => {
  alogator("red", "Failed authorisation");
  res.status(200).send("Failed Login");
};

const successResponse = (req, res) => {
  alogator("green", "Successful authorisation");
  res.status(200).send("Succesful login");
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
