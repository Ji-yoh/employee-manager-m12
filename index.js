// install express & mysql packages
const express = require('express');
const mysql = require('mysql');
const inquirer = require('inquirer');
const dotenv = require('dotenv');
const db = require('././db/connection');

// const routes = require('./routes')

const app = express();

// Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.use('/api', routes);

// moved mysql connections to connection.js in /db

// removed server connection, don't need to connect to localhost

// use switch cases to create queries for each option
function promptUser(){
    inquirer.prompt([
        {
            type: 'list',
            name: 'prompt',
            message: 'What would you like to do?',
            choices: ['View all departments', 'View all roles', 'View all employees']
        }
    ]).then((answers) => { 
        // move queries to seperate file
        switch(answers.prompt) {
            case 'View all departments':
                db.connect((err) => {
                    if (err) throw err;
                    db.query('SELECT * FROM department', (err, results) => {
                        if (err) {
                            console.log(err);
                        } else {
                            console.table(results);
                        }
                    });
                })
                break;
            case 'View all roles':
                db.query('SELECT * FROM roles', (err, results) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.table(results);
                    }
                });
                break;
            case 'View all employees':
                db.query('SELECT * FROM employees', (err, results) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.table(results)
                    }
                });
                break;
        }
    })
}

promptUser();
