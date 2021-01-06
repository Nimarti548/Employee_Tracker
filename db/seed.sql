USE employee_db;

INSERT INTO department (name) 
VALUES ("engineering"), ("sales"), ("finance"), ("legal");
INSERT INTO role (title, salary, department_id) 
VALUES ("sales person", 60000, 2), ("software engineer", 80000, 1), ("financial planner", 70000, 3), ("lawyer", 100000, 4);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jim", "Halpert", 2, NULL), ("Michael", "Scott", 2, 1);