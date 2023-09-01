const mysql = require('mysql');
const inquirer = require('inquirer');
const dotenv = require('dotenv');
const db = require('././db/connection');
// const mySqlQueries = require('./db/queries')

// const routes = require('./routes')

// moved mysql connections to connection.js in /db

// removed server connection, don't need to connect to localhost

// use switch cases to create queries for each option
function promptUser() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'prompt',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', 'Exit'],
            loop: true
        }
    ]).then((answers) => { 
        // move queries to seperate file
        switch(answers.prompt) {
            case 'View all departments':
                db.query('SELECT * FROM departments', (err, results) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.table(results);
                        return promptUser();
                        }
                    }); 
                break;
            case 'View all roles':
                db.query('SELECT * FROM roles', (err, results) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.table(results);
                        return promptUser();
                    }
                });
                break;
            case 'View all employees':
                db.query(`SELECT 
                        employees.id AS 'ID', 
                        CONCAT(employees.first_name, ' ', employees.last_name) AS 'Employee Name',
                        roles.title AS 'Role',
                        roles.salary AS 'Salary',
                        CONCAT(manager.first_name, ' ', manager.last_name) AS 'Manager',
                        employees.manager_id AS 'Manager ID'
                        FROM employees 
                        JOIN roles ON employees.role_id = roles.id
                        JOIN departments ON roles.department_id = departments.id
                        LEFT JOIN employees manager ON manager.id = employees.manager_id`, (err, results) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.table(results);
                        return promptUser();
                    }
                });
                break;
            case 'Exit':
                process.exit();
        }
    })
}

promptUser();

// module.exports = promptUser()
