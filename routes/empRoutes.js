const express = require('express')
const db = require('../db/connection')

const app = express()

app.get('/', (req, res) => {
    res.send('Route connected')
})

app.post('/', (req, res) => {
    res.send('Route connected')
})

module.exports = app