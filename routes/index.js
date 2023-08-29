const express = require('express')

const empRoutes = require('./empRoutes')

const app = express()

app.use('/emp', empRoutes)

module.exports = app