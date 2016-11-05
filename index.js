let express = require('express')
let mongoose = require('mongoose')

let app = express()

let env = process.env.NODE_ENV || 'development'
let port = process.env.port || 1337
mongoose.Promise = global.Promise

app.set('view engine', 'pug')
app.set('views', './server/views')

app.get('/', (req, res) => {
    "use strict";
    mongoose.connect('mongodb://localhost:27017/some-express-db')

    console.log('MongoDB ready!')
    res.render('index')
})
app.listen(port)
console.log('Server running on port 1337........')