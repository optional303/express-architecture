let encryption = require('../utilities/encryption')
let User = require('mongoose').model('User')

module.exports = {
    register: (req, res) => {
        "use strict";
        res.render('users/register')
    },
    create: (req, res) => {
        "use strict";
        let user = req.body

        if(user.password !== user.confirmPassword){
            user.globalError = 'Passwords do not match!'
            res.render('users/register', user)
        }else {
            user.salt = encryption.generateSalt()
            user.hashedPass = encryption.generateHashedPassword(user.salt, user.password)

            User
                .create(user)
                .then(user => {
                req.logIn(user, (err, user) => {
                    if(err){
                       res.render('user/register', {globalError: 'Opaaa 500'})
                        return
                    }
                    res.redirect('/')
                })
            })
        }
    },
    login: (req, res) => {
        "use strict";
        res.render('users/login')
    },
    authenticate: (req, res) => {
        "use strict";
        let inputUser = req.body

        User
            .findOne({username: inputUser.username})
            .then(user => {
                if(!user.authenticate(inputUser.password)){
                    res.render('users/login', {globalError: 'Invalid username or password'})
                }else {
                    req.logIn(user, (err, user) => {
                        if(err){
                            res.render('user/login', {globalError: 'Oppps 500'})
                            return
                        }
                        res.redirect('/')
                    })
                }
            })
    },
    logout: (req, res) => {
        "use strict";
        req.logout()
        res.redirect('/')
    }
}
