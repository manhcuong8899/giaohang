const db = require('../models/connectionDB');
//// Du lieu cau hinh tai khoan ngan hang
function banks_supply(supplyid){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql = 'SELECT * FROM banks where supply_id = ?';
            con.query(sql,supplyid,function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}
function created(data){
    if(data){
        return new Promise((resolve, reject) => {
            db.connectionDB().getConnection(function(err, con) {
                if (err) throw err;
                con.query('INSERT INTO banks SET ?', data,function (err,result) {
                    con.release();
                    if (err) return reject(err);
                    return resolve(result);
                });
            });
        });
    }
}
function updated_supply(data,bankid,supplyid){
    if(data){
        return new Promise((resolve, reject) => {
            db.connectionDB().getConnection(function(err, con) {
                if (err) throw err;
                var sql    = 'UPDATE banks SET code = ?,name = ?,number = ?, account = ?, branch = ? WHERE id=? and supply_id = ?';
                con.query(sql, [data.code,data.name,data.number,data.account,data.branch,bankid,supplyid],function (err,result){
                    con.release();
                    if (err) return reject(err);
                    return resolve(result);
                });
            });
        });
    }
}
function view_supply(id,supplyid) {
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            con.query('select * from banks where id = ? and supply_id=?', [id,supplyid],
                (err, result) => {
                    con.release();
                    if (err) return reject(err);
                    return resolve(result[0]);
                });
        });

    });
}
function delete_supply(id,supplyid){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con){
            if (err) throw err;
            var sql = "DELETE FROM banks WHERE id =? and supply_id=?";
            con.query(sql,[id,supplyid],function (err,result){
                con.release();
                if (err) return reject(err);
                if(result){
                    return resolve(result);
                }
            });
        });
    });
}
function defaultempty_supply(bankid,supplyid){
        return new Promise((resolve, reject) => {
            db.connectionDB().getConnection(function(err, con) {
                if (err) throw err;
                var sql    = 'UPDATE banks SET setdefault = ? WHERE id != ? and supply_id = ?';
                con.query(sql, [0,bankid,supplyid],function (err,result){
                    con.release();
                    if (err) return reject(err);
                    return resolve(result);
                });
            });
        });
}

function setdefault_supply(bankid,supplyid){
        return new Promise((resolve, reject) => {
            db.connectionDB().getConnection(function(err, con) {
                if (err) throw err;
                var sql    = 'UPDATE banks SET setdefault = ? WHERE id=? and supply_id = ?';
                con.query(sql, [1,bankid,supplyid],function (err,result){
                    con.release();
                    if (err) return reject(err);
                    return resolve(result);
                });
            });
        });
}
//// Banks for Shop
function banks_shop(shopid){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql = 'SELECT * FROM banks where shop_id = ?';
            con.query(sql,shopid,function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}

function updated_shop(data,bankid,shopid){
    if(data){
        return new Promise((resolve, reject) => {
            db.connectionDB().getConnection(function(err, con) {
                if (err) throw err;
                var sql    = 'UPDATE banks SET code = ?,name = ?,number = ?, account = ?, branch = ? WHERE id=? and shop_id = ?';
                con.query(sql, [data.code,data.name,data.number,data.account,data.branch,bankid,shopid],function (err,result){
                    con.release();
                    if (err) return reject(err);
                    return resolve(result);
                });
            });
        });
    }
}
function view_shop(id,shopid) {
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            con.query('select * from banks where id = ? and shop_id=?', [id,shopid],
                (err, result) => {
                    con.release();
                    if (err) return reject(err);
                    return resolve(result[0]);
                });
        });

    });
}
function delete_shop(id,shopid){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql = "DELETE FROM banks WHERE id =? and shop_id=?";
            con.query(sql,[id,shopid],function (err,result){
                con.release();
                if (err) return reject(err);
                if(result){
                    return resolve(result);
                }
            });
        });
    });
}
function defaultempty_shop(bankid,shopid){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql    = 'UPDATE banks SET setdefault = ? WHERE id != ? and shop_id = ?';
            con.query(sql, [0,bankid,shopid],function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}

function setdefault_shop(bankid,shopid){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql    = 'UPDATE banks SET setdefault = ? WHERE id=? and shop_id = ?';
            con.query(sql, [1,bankid,shopid],function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}

module.exports ={
    banks_supply:banks_supply,
    created:created,
    updated_supply:updated_supply,
    view_supply:view_supply,
    delete_supply:delete_supply,
    defaultempty_supply:defaultempty_supply,
    setdefault_supply:setdefault_supply,
    banks_shop:banks_shop,
    updated_shop:updated_shop,
    view_shop:view_shop,
    delete_shop:delete_shop,
    defaultempty_shop:defaultempty_shop,
    setdefault_shop:setdefault_shop
}