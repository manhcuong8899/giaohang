const db = require('../models/connectionDB');
function created(data){
    if(data){
        return new Promise((resolve, reject) => {
            db.connectionDB().getConnection(function(err, con) {
                if (err) throw err;
                con.query('INSERT INTO shop SET ?', data,function (err,result) {
                    con.release();
                    if (err) return reject(err);
                    return resolve(result);
                });
            });
        });
    }
}
function updated(data,shopid){
    if(data){
        return new Promise((resolve, reject) => {
            db.connectionDB().getConnection(function(err, con) {
                if (err) throw err;
                var sql    = 'UPDATE shop SET name = ?,phone = ?,email = ?,taxcode = ?,address=?,status = ? WHERE id=?';
                con.query(sql, [data.name,data.phone,data.email,data.taxcode,data.address,data.status,shopid],function (err,result) {
                con.release();
                    if (err) return reject(err);
                    return resolve(result);
                });
            });
        });
    }
}
function all(){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql = 'SELECT * FROM shop';
            con.query(sql,function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}
function seach(data){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            let sql = 'SELECT * FROM shop where 1=1';
            if (data.s_name !== '') {
                sql += ' and name LIKE "%'+ data.s_name +'%"';
            }
            if (data.s_phone !== '') {
                sql += ' and phone LIKE "%'+ data.s_phone +'%"';
            }
            con.query(sql,function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}
function getUsername(username) {
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            con.query('select * from users where username = ?', username,
                (err, result) => {
                    con.release();
                    if (err) return reject(err);
                    return resolve(result);
                });
        });

    });
}

function deleteshop(id){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql = "DELETE FROM shop WHERE id =?";
            con.query(sql,id,function (err,result){
                if (err) return reject(err);
                if(result){
                    var sql = "DELETE FROM users WHERE shop_id =?";
                    con.query(sql,id,function (err,result){
                        con.release();
                        if (err) return reject(err);
                        return resolve(result);
                    });
                }
            });
        });
    });
}
function view(id) {
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            con.query('select * from shop where id = ?', id,
                (err, result) => {
                con.release();
                    if (err) return reject(err);
                    return resolve(result[0]);
                });
        });
    });
}
function getShopid(phone){
    return new Promise((resolve, reject) =>{
        db.connectionDB().getConnection(function(err, con){
            con.query('select * from shop where phone = ?', phone,
                (err, result) => {
                con.release();
                    if (err) return reject(err);
                    return resolve(result[0].id);
                });
        });
    });
}
function countuser(shopid){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con){
            var sql = 'SELECT COUNT(*) AS TotalCount FROM users WHERE shop_id = ?'
            con.query(sql,shopid,function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result[0]);
            });
        });

    });
}
function updated_full(data,shopid){
    if(data){
        return new Promise((resolve, reject) => {
            db.connectionDB().getConnection(function(err, con) {
                if (err) throw err;
                var sql    = 'UPDATE shop SET name = ?,full_name = ?,images = ?,phone = ?,email = ?,taxcode = ?,address=?,status = ? WHERE id=?';
                con.query(sql, [data.name,data.full_name,data.images,data.phone,data.email,data.taxcode,data.address,data.status,shopid],function (err,result) {
                con.release();
                    if (err) return reject(err);
                    return resolve(result);
                });
            });
        });
    }
}
function bycode(code) {
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            con.query('select * from shop where code = ?', code,
                (err, result) => {
                con.release();
                    if (err) return reject(err);
                    return resolve(result[0]);
                });
        });

    });
}
module.exports ={
    created:created,
    all:all,
    deleteshop:deleteshop,
    view:view,
    updated:updated,
    seach:seach,
    getShopid:getShopid,
    countuser,countuser,
    updated_full:updated_full,
    bycode:bycode,
}