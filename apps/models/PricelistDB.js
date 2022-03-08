const db = require('../models/connectionDB');
function created(data){
    if(data){
        return new Promise((resolve, reject) => {
            db.connectionDB().getConnection(function(err, con) {
                if (err) throw err;
                con.query('INSERT INTO pricelist SET ?', data,function (err,result) {
                    con.release();
                    if (err) return reject(err);
                    return resolve(result);
                });
            });
        });
    }
}
function updated(data,pricelistid){
    if(data){
        return new Promise((resolve, reject) => {
            db.connectionDB().getConnection(function(err, con) {
                if (err) throw err;
                var sql    = 'UPDATE pricelist SET name = ?,value = ?,fee = ?,type = ? WHERE id=?';

                con.query(sql, [data.name,data.value,data.fee,data.type,pricelistid],function (err,result) {
                    con.release();
                    if (err) return reject(err);
                    return resolve(result);
                });
            });
        });
    }
}

function shop(shopid){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql = 'SELECT * FROM pricelist where type_cost=1 and status=1 and shop_id = ?';
            con.query(sql,shopid,function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}

function NTfee(shopid){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql = 'SELECT * FROM pricelist where type_cost=1 and status=1 and type = "NT" and shop_id = ?';
           con.query(sql,shopid,function (err,result){
               con.release();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}
function NMfee(shopid){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql = 'SELECT * FROM pricelist where type_cost=1 and status=1 and type = "NM" and shop_id = ?';
            con.query(sql,shopid,function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}
function LMfee(shopid){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql = 'SELECT * FROM pricelist where type_cost=1 and status=1 and type = "LM" and shop_id = ?';
            con.query(sql,shopid,function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}

function deleteprice(id){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql = "DELETE FROM pricelist WHERE id =?";
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
            con.query('select * from pricelist where id = ?', id,
                (err, result) => {
                con.release();
                    if (err) return reject(err);
                    return resolve(result[0]);
                });
        });

    });
}

function codfee(shopid){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql = 'SELECT * FROM pricelist where type_cost=2 and status=1 and shop_id = ?';
            con.query(sql,shopid,function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}

function MHfee(){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql = 'SELECT * FROM pricelist where type_cost=3 and status=1 and type = "MH"';
            con.query(sql,function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}
function KDfee(){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql = 'SELECT * FROM pricelist where type_cost=3 and status=1 and type = "KD"';
            con.query(sql,function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}

function getfee(type,value){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql = 'SELECT * FROM pricelist where type_cost=1 and status=1 and type = ? and value > ? ORDER BY value ASC; SELECT * FROM pricelist where type_cost=1 and status=1 and type = ? ORDER BY value DESC';
           con.query(sql,[type,value,type],function (err,result){
               con.release();
                if (err) return console.log(err);
                return resolve(result);
            });
        });
    });
}
function getfeeorders(value){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql = 'SELECT * FROM pricelist where type_cost=2 and status=1 and value >= ? ORDER BY value ASC';
            con.query(sql,[value],function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result[0]);
            });
        });
    });
}

module.exports ={
    created:created,
    shop:shop,
    NTfee:NTfee,
    NMfee:NMfee,
    LMfee:LMfee,
    deleteprice:deleteprice,
    view:view,
    updated:updated,
    codfee:codfee,
    MHfee:MHfee,
    KDfee:KDfee,
    getfee:getfee,
    getfeeorders:getfeeorders,
}