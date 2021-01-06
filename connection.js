const mysql = require("mysql");
const util = require("util")




const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "JunieJune548!",
    database: "employee_db"
});



connection.connect((err) => {
    if (err) throw err; 
    console.log(`connected as id ${connection.threadId}\n`);
});

connection.query = util.promisify(connection.query)

module.exports = connection