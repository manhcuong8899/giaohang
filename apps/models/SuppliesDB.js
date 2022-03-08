const db = require('../models/connectionDB');
function created(data){
    if(data){
        return new Promise((resolve, reject) => {
            db.connectionDB().getConnection(function(err, con) {
                if (err) throw err;
                con.query('INSERT INTO supply SET ?', data,function (err,result) {
                    con.release();
                    if (err) return reject(err);
                    return resolve(result);
                });
            });
        });
    }
}
function updated(data,suppliesid){
    if(data){
        return new Promise((resolve, reject) => {
            db.connectionDB().getConnection(function(err, con) {
                if (err) throw err;
                var sql    = 'UPDATE supply SET name = ?,full_name = ?,phone = ?,email = ?,taxcode = ?,address=?,status = ? WHERE id=?';

                con.query(sql, [data.name,data.full_name,data.phone,data.email,data.taxcode,data.address,data.status,suppliesid],function (err,result) {
                    con.release();
                    if (err) return reject(err);

                    return resolve(result);
                });
            });
        });
    }
}

function updated_full(data,suppliesid){
    if(data){
        return new Promise((resolve, reject) => {
            db.connectionDB().getConnection(function(err, con) {
                if (err) throw err;
                var sql    = 'UPDATE supply SET name = ?,full_name = ?,images = ?,phone = ?,email = ?,taxcode = ?,address=?,status = ? WHERE id=?';

                con.query(sql, [data.name,data.full_name,data.images,data.phone,data.email,data.taxcode,data.address,data.status,suppliesid],function (err,result) {
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
        db.connectionDB().getConnection(function(err, con){
            if (err) throw err;
            var sql = 'SELECT * FROM supply';
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
            let sql = 'SELECT * FROM supply where 1=1';
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

function deletesupplies(id){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql = "DELETE FROM supply WHERE id =?";
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
            con.query('select * from supply where id = ?', id,
                (err, result) => {
                    con.release();
                    if (err) return reject(err);
                    return resolve(result[0]);
                });
        });

    });
}
function bycode(code) {
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            con.query('select * from supply where code = ?', code,
                (err, result) => {
                con.release();
                    if (err) return reject(err);
                    return resolve(result[0]);
                });
        });

    });
}
function getSuppliesid(phone){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            con.query('select * from supply where phone = ?', phone,
                (err, result) => {
                con.release();
                    if (err) return reject(err);
                    return resolve(result[0].id);
                });
        });

    });
}

function countuser(supplyid){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            var sql = 'SELECT COUNT(*) AS TotalCount FROM users WHERE supply_id = ?'
            con.query(sql,supplyid,function (err,result){
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
    deletesupplies:deletesupplies,
    view:view,
    updated:updated,
    seach:seach,
    getSuppliesid:getSuppliesid,
    countuser:countuser,
    bycode:bycode,
    updated_full:updated_full
}