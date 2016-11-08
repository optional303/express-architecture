const mongoose = require('mongoose')
const encryption = require('../utilities/encryption')

let requiredValidationMessage = '{PATH} is required'

let userSchema = mongoose.Schema({
    username: {type: String, required: requiredValidationMessage, unique: true},
    firstName: {type: String, required: requiredValidationMessage },
    lastName: {type: String, required: requiredValidationMessage },
    salt: String,
    hashedPass: String,
    roles: [String]
})

userSchema.method({
    authenticate: function(password){
        "use strict";
        let inputHashedPassword = encryption.generateHashedPassword(this.salt, password)
        if(inputHashedPassword === this.hashedPass){
            return true
        }else {
            return false
        }
    }
})
let User = mongoose.model('User', userSchema)

module.exports.seedAdminUser = () => {
    User.find({}).then(user => {
        if(user.length === 0) {
            let salt = encryption.generateSalt()
            let hashedPass = encryption.generateHashedPassword(salt, 'Admin12')
            "use strict";
            User.create({
                username: 'Admin',
                firstName: 'Admin',
                lastName: 'Adminov',
                salt: salt,
                hashedPass: hashedPass,
                roles: ['Admin']
            })
        }
    })
}