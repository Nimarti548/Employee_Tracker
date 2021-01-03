const mysql = require("mysql");
const inquirer = require("inquirer");
require("console.table");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "JunieJune548!",
    database: "employee_db"
});

const menu = () => {
    inquirer.prompt({
        name:"menuOptions",
        type:"list",
        message:"Please make a selection.",
        choices:[
            'View Departments',
            'View Roles', 
            'View Employees', 
            'Add Department',
            'Add Role', 
            'Add Employee', 
            "Exit"
        ]
    })
    .then(({ menuOptions }) => {
        switch (menuOptions) {
            case 'View Departments':
                viewDepartments()
                break;
            case 'View Roles':
                viewRoles()
                break;
            case 'View Employees':
                viewEmployees()
                break;
            case 'Add Department':
                addDepartment()
                break;
            case 'Add Role':
                addRole()
                break;
            case 'Add Employee':
                addEmployee()
                break;
            default:
                connection.end()
                process.exit(0)
        }
    })
}

const viewDepartments = () => {
    const query = 
      "SELECT * FROM department"
      connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res)
        menu()
    });
}

const viewRoles = () => {
    const query = 
      "SELECT * FROM role"
      connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res)
        menu()
    });
}

const viewEmployees = () => {
    const query = 
      "SELECT * FROM employee"
      connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res)
        menu()
    });
}


connection.connect((err) => {
    if (err) throw err; 
    console.log(`connected as id ${connection.threadId}\n`);
    menu()
});