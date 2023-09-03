// consider creating a single function to handle all queries, call that function in the switch cases- queries can be moved to seperate file
const mysql = require('mysql');
const inquirer = require('inquirer');
const dotenv = require('dotenv');
const db = require('././db/connection');
const mySqlQueries = require('./db/queries')
const sqlQuery = new mySqlQueries(); // new instance of mySqlQueries class

// moved mysql connections to connection.js in /db

// removed server connection, don't need to connect to localhost

// create functions to add departments, roles, employees

async function addDepartment() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'addDepartment',
            message: 'What is the name of the department you would like to add?',
        }
    ]).then((answers) => {
       switch(answers.addDepartment) {
              case answers.addDepartment:
                db.query(sqlQuery.addDepartment(), [answers.addDepartment], (err, results) => {
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

async function addRole() {
    const departments = db.query(sqlQuery.viewDepartments()) // get all departments
    const deptObject = Object.from(departments)
    const deptArray = Array.from(deptObject)
    const departmentChoices = deptArray.map(department => `${department.name}`)
    // create array of department names
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
        },
        {
            type: 'list',
            name: 'addDepartment',
            message: 'Which department does this role belong to?',
            choices: departmentChoices
        }
    ]).then((answers) => {
        const departmentName = answers.addDepartment
        const departmentID = departments.find(departments => departments.name === departmentName).id // find department id based on department name
        switch(answers.addRole) {
            case answers.addRole:
                db.query(dept.addRole(), [answers.addRole, answers.addSalary, departmentID], (err, results) => {
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

function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'addFirstName',
            message: 'What is the first name of the employee you would like to add?',
        },
        {
            type: 'input',
            name: 'addLastName',
            message: 'What is the last name of the employee you would like to add?',
        },
        {
            type: 'input',
            name: 'addRoleID',
            message: 'What is the role ID of the employee you would like to add?',
        },
        {
            type: 'input',
            name: 'addManagerID',
            message: 'What is the manager ID of the employee you would like to add?',
        }
    ])
}

// use switch cases to create queries for each option
function promptUser() {
    inquirer.prompt([
        {
            type: 'list',
            name: 'prompt',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees', new inquirer.Separator(), 'Add a department', 'Add a role', 'Add an employee', new inquirer.Separator(), 'Exit'],
            loop: true
        }
    ]).then((answers) => { 
        // move queries to seperate file
        switch(answers.prompt) {
            case 'View all departments':
                db.query(sqlQuery.viewDepartments(), (err, results) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.table(results);
                        return promptUser();
                        }
                    }); 
                break;
            case 'View all roles':
                db.query(sqlQuery.viewRoles(), (err, results) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.table(results);
                        return promptUser();
                    }
                });
                break;
            case 'View all employees':
                db.query(sqlQuery.viewEmployees(), (err, results) => {
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
            case 'Add an employee':
                addEmployee();
                break;
            case 'Exit':
                process.exit();
        }
    })
}

promptUser();

// module.exports = promptUser()
