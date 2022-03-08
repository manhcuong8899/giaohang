const config = require("config");
const options = {
    idleCheckInterval: 1000,
    maxConnextionTimeout: 30000,
    idlePoolTimeout: 2000,
    errorLimit: 5,
    preInitDelay: 50,
    sessionTimeout: 60000,
    onConnectionAcquire: () => { console.log("Acquire"); },
    onConnectionConnect: () => { console.log("Connect"); },
    onConnectionEnqueue: () => { console.log("Enqueue"); },
    onConnectionRelease: () => { console.log("Release"); },
    mySQLSettings: {
        charset: 'utf8',
        multipleStatements: true,
        connectTimeout: 15000,
        acquireTimeout: 30000,
        waitForConnections: true,
        connectionLimit: 3000,
        queueLimit: 5000,
        debug: true
    }
}
const PoolManager = require('mysql-connection-pool-manager');
const mySQL = PoolManager(options);
function connectionDB ()
{
    return mySQL.raw.createPool({
        host: config.get("mysql.host"),
        user: config.get("mysql.user_db"),
        password: config.get("mysql.pass_db"),
        database: config.get("mysql.database"),
        port: config.get("mysql.port"),
        multipleStatements: true,
        charset: 'utf8',
        connectTimeout: 15000,
        acquireTimeout: 30000,
        waitForConnections: true,
        connectionLimit: 3000,
        queueLimit: 5000,
    });
}
module.exports={
    connectionDB:connectionDB
}