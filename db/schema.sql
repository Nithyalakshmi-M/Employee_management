CREATE DATABASE IF NOT EXISTS employee_management;
USE employee_management;

CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_name VARCHAR(100) NOT NULL,
    employee_id VARCHAR(20) UNIQUE NOT NULL,
    department VARCHAR(50),
    designation VARCHAR(100),
    project VARCHAR(100),
    type ENUM('Office','Remote','Contract') DEFAULT 'Office',
    status ENUM('Permanent','Probation','Intern') DEFAULT 'Permanent',
    image_url VARCHAR(255),  
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
    