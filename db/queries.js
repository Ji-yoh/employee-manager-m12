// currently not in use since I want promptUser() to be recursive

const db = require('./connection')
const promptUser = require('../index') // import promptUser function from index.js

class mySqlQueries {
    viewDepartments() {
        return 'SELECT * FROM departments'
    }
    viewRoles() {
        return 'SELECT * FROM roles'
    }
    viewEmployees() {
        return `SELECT 
                employees.id AS 'ID', 
                CONCAT(employees.first_name, ' ', employees.last_name) AS 'Employee Name',
                roles.title AS 'Role',
                roles.salary AS 'Salary',
                CONCAT(manager.first_name, ' ', manager.last_name) AS 'Manager',
                employees.manager_id AS 'Manager ID'
                FROM employees 
                JOIN roles ON employees.role_id = roles.id
                JOIN departments ON roles.department_id = departments.id
                LEFT JOIN employees manager ON manager.id = employees.manager_id`
    }
    addDepartment() {
        return `INSERT INTO departments (name) VALUES (?)`
    }
    addRole() {
        return `INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)`
    }
}

module.exports = mySqlQueries;