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
