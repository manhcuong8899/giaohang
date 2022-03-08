const config = require("config");
const mysql = require('mysql2');
function Connection(){
   return  mysql.createPool({
            connectionLimit: 50,
            host: config.get("mysql.host"),
            user: config.get("mysql.user_db"),
            password: config.get("mysql.pass_db"),
            database: config.get("mysql.database"),
            multipleStatements : true,
            connectTimeout: 15000,
            acquireTimeout: 30000,
            waitForConnections: true,
            connectionLimit: 3000,
            queueLimit: 5000,
        });
}
module.exports={
    connectionDB:Connection
}
