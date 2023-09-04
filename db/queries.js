// currently not in use since I want promptUser() to be recursive

const db = require('./connection')

class mySqlQueries {
    viewDepartments() {
        return 'SELECT * FROM departments'
    }
    viewRoles() {
        return 'SELECT * FROM roles'
    }
    selectEmployee() {
        return 'SELECT * FROM employees'
    }
    viewEmployees() {
        return `SELECT 
                employees.id AS 'ID', 
                CONCAT(employees.first_name, ' ', employees.last_name) AS 'Employee Name',
                roles.title AS 'Role',
                employees.role_id AS 'Role ID',
                roles.salary AS 'Salary',
                CONCAT(manager.first_name, ' ', manager.last_name) AS 'Manager',
                employees.manager_id AS 'Manager ID',
                departments.name AS 'Department'
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
    addEmployee() {
        return `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`
    }
    updateEmployeeRole() {
        return `UPDATE employees SET role_id = ? WHERE id = ?`
    }
}

module.exports = mySqlQueries;