module.exports = function() {

    return function (req, res, next) {
        if (!req.isAuthenticated()) {
            res.redirect('/failure')
          } else {
            next();
          }
    }
}