const config = require("config");
const mysql = require('mysql');
const options = {
    idleCheckInterval: 1000,
    maxConnextionTimeout: 30000,
    idlePoolTimeout: 3000,
    errorLimit: 5,
    preInitDelay: 50,
    sessionTimeout: 60000,
    onConnectionAcquire: () => { console.log("Acquire"); },
    onConnectionConnect: () => { console.log("Connect"); },
    onConnectionEnqueue: () => { console.log("Enqueue"); },
    onConnectionRelease: () => { console.log("Release"); },
    mySQLSettings: {
        socketPath: 'C:/xampp/mysql/mysql.sock',
        charset: 'utf8',
        multipleStatements: true,
        connectTimeout: 15000,
        acquireTimeout: 10000,
        waitForConnections: true,
        connectionLimit: 1000,
        queueLimit: 5000,
        debug: true
    }
}
const PoolManager = require('mysql-connection-pool-manager');
const mySQL = PoolManager(options);
function connectionDB ()
{
return mySQL.raw.createConnection({
    host: config.get("mysql.host"),
    user: config.get("mysql.user_db"),
    password: config.get("mysql.pass_db"),
    database: config.get("mysql.database"),
    port: config.get("mysql.port"),
});
}
    module.exports={
        connectionDB:connectionDB
    }
