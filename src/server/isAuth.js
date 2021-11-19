module.exports = function () {
    const alogator = require('./tools/aLOGator').default;

    return function (req, res, next) {
        if (!req.isAuthenticated()) {
            res.redirect('/failure')
          } else {
            alogator("green", "Authentication Check: Passed")
            next();
          }
    }
}