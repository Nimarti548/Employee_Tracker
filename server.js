const connection = require("./connection")
const inquirer = require("inquirer");
require("console.table");


const menu = async () => {
    const {options} = await inquirer.prompt({
        name:"options",
        type:"list",
        message:"Please make a selection.",
        choices:[
            {
                name: 'View Departments',
                value:'View Departments'
            },
            {
                name:'View Roles',
                value:'View Roles'
            },
            {
                name:'View Employees',
                value:'View Employees'
            },
            {
                name:'Add Department',
                value:'Add Department'
            },
            {
                name:'Add Role',
                value:'Add Role'
            },
            {
                name:'Add Employee', 
                value:'Add Employee'
            },
            {
                name:'Exit',
                value:'Exit'
            }
        ]
    })
        switch (options) {
            case 'View Departments':
                return viewDepartments()
            case 'View Roles':
                return viewRoles()
            case 'View Employees':
                return viewEmployees()
            case 'Add Department':
                return addDepartment();
            case 'Add Role':
                return addRole()
            case 'Add Employee':
                return addEmployee() 
            default:
                connection.end()
                process.exit(0)
        }
    }

const viewDepartments = async () => {
    const departments = await connection.query("SELECT * FROM department");
    console.table(departments)
    menu()
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

const addDepartment = async () => {
    const department = await inquirer.prompt({
        name:"name",
        message:"What would you like to name your new Department?"
    })
    await connection.query("INSERT INTO department SET ?", department) 
    
    menu()

}

const addRole = async () => {
    const departments = await connection.query("SELECT * FROM department");
    const departmentChoices = departments.map(
        ({ id, name }) => ({ 
            name: name,
            value: id
        })
    )
    const role = await inquirer.prompt([{
        name: "title",
        message:"What would you like to name your new Role?",
        type: "input"
    },
    {
        name: "salary",
        message: "What would you like the salary to be?",
        type: "input"
    },
    {
        name: "department_id",
        message: "Which department?",
        type:"list",
        choices: departmentChoices
    }]
    )
    await connection.query("INSERT INTO role SET ?", role) 
    
    menu()

}

const addEmployee = async () => {
    const roles = await connection.query("SELECT * FROM role");
    const roleChoices = roles.map(
        ({ id, name }) => ({ 
            name: name,
            value: id
        })
    )
    
    const employee = await inquirer.prompt([{
        name: "first_name",
        message:"What is the first name of the new employee?",
        type: "input"
    },
    {
        name: "last_name",
        message: "What is the last name of the new employee?",
        type: "input"
    },
    {
        name: "role_id",
        message: "Which role?",
        type:"list",
        choices: roleChoices
    },
    {
        name: "manager_id",
        message: "Is this employee a manager?",
        type: "confirm"
    }]
    )
    
    await connection.query("INSERT INTO employee SET ?", employee) 
    
    menu()

}


menu()
