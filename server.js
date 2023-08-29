// install express & mysql packages
const express = require('express');
const mysql = require('mysql');
const inquirer = require('inquirer');
const dotenv = require('dotenv');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// mysql connection, credentials stored in .env file
const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'employee_db'
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
})