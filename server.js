// install express & mysql packages
const express = require('express');
const mysql = require('mysql');
const inquirer = require('inquirer');
const dotenv = require('dotenv');

const routes = require('./routes')

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api', routes);

// moved mysql connections to connection.js in /db

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})