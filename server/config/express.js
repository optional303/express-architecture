const express = require('express')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const passport = require('passport')

module.exports = (config, app) => {
    "use strict";
    app.set('view engine', 'pug')
    app.set('views', config.rootPath + './server/views')

    app.use(cookieParser())
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(session({secret: 'strogo-secretno!@#$%',
    resave: true, saveUninitialized: true}))
    app.use(passport.initialize())
    app.use(passport.session())
    app.use(express.static(config.rootPath + 'public'))

}