const bcrypt = require('bcryptjs')
const saltRounds = 10;
var hashReturn;

//TODO: THIS FUNCTION DOES NOT RETURN THE VALUE BACK TO THE SERVER.JS CALL

const encrypt = (password) => {

    bcrypt.genSalt(saltRounds, function (saltError, salt) {
        if (saltError) {
          throw saltError
        } else {
          bcrypt.hash(password, salt, function(hashError, hash) {
            if (hashError) {
                throw hashError
            } else {
                //return hash;
                console.log(hash)
            }
          })
        }
    })
}

module.exports = {encrypt};
