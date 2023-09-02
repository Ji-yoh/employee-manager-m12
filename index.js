const mysql = require('mysql');
const inquirer = require('inquirer');
const dotenv = require('dotenv');
const db = require('././db/connection');
// const mySqlQueries = require('./db/queries')

// moved mysql connections to connection.js in /db

// removed server connection, don't need to connect to localhost

// create functions to add departments, roles, employees

function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'addDepartment',
            message: 'What is the name of the department you would like to add?',
        }
    ]).then((answers) => {
       switch(answers.addDepartment) {
              case answers.addDepartment:
                db.query(`INSERT INTO departments (name) VALUES ('${answers.addDepartment}')`, (err, results) => {
                     if (err) {
                          console.log(err);
                     } else {
                          console.log('Department added!');
                          return promptUser();
                     }
                });
                break;
       }
    })
};

function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'addRole',
            message: 'What is the name of the role you would like to add?',
        },
        {
            type: 'input',
            name: 'addSalary',
            message: 'What is the salary for this role?',
        }
    ]).then((answers) => {
        switch(answers.addRole) {
            case answers.addRole:
                db.query(`INSERT INTO roles (title, salary) VALUES ('${answers.addRole}', '${answers.addSalary}')`, (err, results) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log('Role added!');
                        return promptUser();
                    }
                });
                break;
        }
    })
}

// use switch cases to create queries for each option
function promptUser() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'prompt',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', new inquirer.Separator(), 'Add a department', 'Add a role', new inquirer.Separator(), 'Exit'],
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
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Exit':
                process.exit();
        }
    })
}

promptUser();

// module.exports = promptUser()
