module.exports = function () {
    const aLOGator = require('./tools/aLOGator').aLOGator;

    return function (req, res, next) {
        if (!req.isAuthenticated()) {
            res.redirect('/failure')
          } else {
            aLOGator("green", "Authentication Check: Passed")
            next();
          }
    }
}