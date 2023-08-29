const mysql = require('mysql');

// mysql connection, credentials stored in .env file
const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'employee_db'
});

module.exports = db;