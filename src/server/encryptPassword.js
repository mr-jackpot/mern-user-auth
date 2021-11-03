const bcrypt = require('bcryptjs')
const saltRounds = 10;

const encrypt = (password) => {

    bcrypt.genSalt(saltRounds, (saltError, salt) => {
        if (saltError) {
            throw saltError;
        } else {
            bcrypt.hash(password, salt, (hashError, hash) => {
                if (hashError) {
                    throw hashError;
                } else {
                    return hash;
                }
            })
        }
    })  
 
}

module.exports = {encrypt};
