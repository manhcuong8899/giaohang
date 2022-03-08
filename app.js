const config = require("config");
const app = require('./config/config');
const host = config.get("server.host");
const port = config.get("server.port");
app.listen(port,host, function () {
console.log("Server is running on port",port);
})