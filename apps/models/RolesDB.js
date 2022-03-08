const db = require('../models/connectionDB');
function all(){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err,con) {
            if (err) throw err;
            con.query('select * from roles',function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}
function addroles(data){
    if(data){
        return new Promise((resolve, reject) => {
            db.connectionDB().getConnection(function(err, con) {
                if (err) throw err;
                con.query('INSERT INTO role_user SET ?', data,function (err,result) {
                    con.release();
                    if (err) return reject(err);
                    return resolve(result);
                });
            });
        });
    }
}
function getrole(id){
    if(id){
        return new Promise((resolve, reject) => {
            db.connectionDB().getConnection(function(err, con) {
                if (err) throw err;
                var sql = 'SELECT roles.name AS name FROM role_user JOIN roles ON role_user.role_id = roles.id where user_id =?';
                con.query(sql,id, function (err,result) {
                   con.release();
                    if (err) return reject(err);
                    return resolve(result);
                });
            });
        });
    }
}
module.exports ={
    all:all,
    addroles:addroles,
    getrole:getrole
}