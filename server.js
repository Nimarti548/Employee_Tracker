const inquirer = require("inquirer");
const connection = require("connection");
require("console.table");

const menu = () => {
    inquirer.prompt({
        name:"menuOptions",
        type:"list",
        message:"Please make a selection.",
        choices:[
            'View departments',
            'View roles', 
            'View employees', 
            'Add department',
            'Add role', 
            'Add employee', 
            "exit"
        ]
    })
    .then(({ menuOptions }) => {
        switch (menuOptions) {
            case 'View Departments':
                viewDepartment()
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

const viewDepartment = () => {
    const query = 
      "SELECT * FROM department"
      connection.query(query, (err, res) => {
        if (err) throw err;
        console.table(res)
        menu()
      });
  }
