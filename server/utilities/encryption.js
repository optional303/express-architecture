const crypto = require('crypto')

module.exports = {
    generateSalt: () => {
        "use strict";
        crypto.randomBytes(128).toString('base64')
    },
    generateHashedPassword: (salt, pwd) => {
        "use strict";
        crypto.createHmac('sha256', salt).update(pwd).digest('hex')
    }
}
