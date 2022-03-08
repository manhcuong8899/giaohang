const db = require('../models/connectionDB');
function created(data){
    if(data){
        return new Promise((resolve, reject) => {
            db.connectionDB().getConnection(function(err, con) {
                if (err) throw err;
                con.query('INSERT INTO discount SET ?', data,function (err,result) {
                    con.release();
                    if (err) return reject(err);
                    return resolve(result);
                });
            });
        });
    }
}
function updated(data,discountid){
    if(data){
        return new Promise((resolve, reject) => {
            db.connectionDB().getConnection(function(err, con) {
                if (err) throw err;
                var sql    = 'UPDATE discount SET name = ?,value = ?, discount = ? WHERE id=?';

                con.query(sql, [data.name,data.value,data.discount,discountid],function (err,result) {
                    con.release();
                    if (err) return reject(err);

                    return resolve(result);
                });
            });
        });
    }
}
function supply(supplyid){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql = 'SELECT * FROM discount where supply_id = ?';
            con.query(sql,supplyid,function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}
function shop(shopid){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql = 'SELECT * FROM discount where shop_id = ?';
            con.query(sql,shopid,function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}

function deletediscount(id){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql = "DELETE FROM discount WHERE id =?";
            con.query(sql,id,function (err,result){
                con.release();
                if (err) return reject(err);
                if(result){
                    return resolve(result);
                }
            });
        });
    });
}
function view(id) {
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            con.query('select * from discount where id = ?', id,
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
    supply:supply,
    shop:shop,
    deletediscount:deletediscount,
    view:view,
    updated:updated
}