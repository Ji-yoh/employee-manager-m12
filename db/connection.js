const mysql = require('mysql');
require('dotenv').config();

// mysql connection, credentials stored in .env file
const db = mysql.createConnection({
    host: 'localhost',
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

module.exports = db;