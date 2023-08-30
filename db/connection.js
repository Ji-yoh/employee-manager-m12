const mysql = require('mysql');
const dotenv = require('dotenv');

// mysql connection, credentials stored in .env file
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee_db'
});

module.exports = db;