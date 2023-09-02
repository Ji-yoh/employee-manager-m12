/*removed quotes*/
DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE departments (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INT ,
    FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE CASCADE
);

CREATE TABLE employees (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT NULL,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    FOREIGN KEY (manager_id) REFERENCES employees(id) ON DELETE SET NULL
);

INSERT INTO departments (name) 
VALUES  ('Sales'),
        ('Marketing'),
        ('Engineering'),
        ('Finance'),
        ('Legal'),
        ('Human Resources');

INSERT INTO roles (title, salary, department_id)
VALUES  ('Sales Lead', 100000, 1),
        ('Salesperson', 80000, 1),
        ('Lead Engineer', 150000, 3),
        ('Software Engineer', 120000, 3),
        ('Account Manager', 160000, 4),
        ('Accountant', 125000, 4),
        ('Legal Team Lead', 250000, 5),
        ('Lawyer', 190000, 5),
        ('Lead HR', 250000, 6),
        ('HR Representative', 150000, 6);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  ('Eldon', 'Tyrel', 1, NULL),
        ('JF', 'Sebastion', 2, 1),
        ('Roy', 'Batty', 3, NULL),
        ('Pris', 'Stratton', 4, 3),
        ('Leon', 'Kowalski', 4, 3),
        ('Rachael', 'Rosen', 4, 3),
        ('Harry', 'Bryant', 7, NULL),
        ('Rick', 'Deckard', 8, 7),
        ('Gaff', 'Gaff', 9, 7),
        ('Bryant', 'Bryant', 10, 7),
        ('Iris', 'Iris', 10, 7);