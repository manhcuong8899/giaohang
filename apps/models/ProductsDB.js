const db = require('../models/connectionDB');
function all(){
    return new Promise((resolve, reject) =>{
        db.connectionDB().getConnection(function(err, con){
            if (err) throw err;
            var sql = "SELECT products.id AS id, products.name AS name,products.slug AS slug,products.status AS status,products.branch AS branch,products.cate_id AS cate_id,category.name AS namecate,products.unit_id AS unit_id,units.code AS nameunit FROM products JOIN category ON category.id = products.cate_id JOIN units ON units.id = products.unit_id where products.status!= 0";
            con.query(sql,function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}
function byid(id){
    return new Promise((resolve, reject) =>{
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql = "SELECT * FROM products where id =?";
            con.query(sql,id,function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result[0]);
            });
        });
    });
}

function created(data){
    if(data){
        return new Promise((resolve, reject) => {
            db.connectionDB().getConnection(function(err, con) {
                if (err) throw err;
                con.query('INSERT INTO products SET ?', data,function (err,result) {
                    con.release();
                    if (err) return reject(err);
                    return resolve(result);
                });
            });
        });
    }
}
function updated(data,proid){
    if(data){
        return new Promise((resolve, reject) => {
            db.connectionDB().getConnection(function(err, con) {
                if (err) throw err;
                var sql    = "UPDATE products SET name = ?,slug = ?,images = ?,keywords = ?,description = ?,short = ?,content = ?,cate_id= ?,unit_id =?, branch = ?, status = ? WHERE id=?";
                con.query(sql, [data.name,data.slug,data.images,data.keywords,data.description,data.short,data.content,data.cate_id,data.unit_id,data.branch,data.status,proid],function (err,result) {
                   con.release();
                    if (err) return reject(err);
                    return resolve(result);
                });
            });
        });
    }
}
function view(id) {
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            con.query('select * from products where id = ?', id,
                (err, result) => {
                    con.release();
                    if (err) return reject(err);
                    return resolve(result[0]);
                });
        });

    });
}
function deleteproducts(id){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql = "DELETE FROM products WHERE id =?";
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
function seachproducts(data){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql = "SELECT products.id AS id, products.name AS name,products.slug AS slug,products.status AS status,products.branch AS branch,products.cate_id AS cate_id,category.name AS namecate,products.unit_id AS unit_id,units.code AS nameunit FROM products JOIN category ON category.id = products.cate_id JOIN units ON units.id = products.unit_id where products.status=1";
            if (data.s_category !== '-1') {
                sql += ' and products.cate_id =' + data.s_category;
            }
            if (data.s_name !== '') {
                sql += ' and products.name LIKE "%'+ data.s_name +'%"';
            }
            con.query(sql,function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}
function supply_all(supplyid){
    return new Promise((resolve, reject) =>{
        db.connectionDB().getConnection(function(err, con){
            if (err) throw err;
            var sql = "SELECT products.id AS id, products.name AS name,products.slug AS slug,products.status AS status,products.branch AS branch,products.cate_id AS cate_id,category.name AS namecate,products.unit_id AS unit_id,units.code AS nameunit FROM products JOIN category ON category.id = products.cate_id JOIN units ON units.id = products.unit_id where products.supply_id=?";
            con.query(sql,supplyid,function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}
function supply_updated(data,proid,supplyid){
    if(data){
        return new Promise((resolve, reject) => {
            db.connectionDB().getConnection(function(err, con) {
                if (err) throw err;
                var sql    = "UPDATE products SET name = ?,slug = ?,images = ?,keywords = ?,description = ?,short = ?,content = ?,cate_id= ?,unit_id =?, branch = ? WHERE id=? and supply_id=?";
                con.query(sql, [data.name,data.slug,data.images,data.keywords,data.description,data.short,data.content,data.cate_id,data.unit_id,data.branch,proid,supplyid],function (err,result) {
                    con.release();
                    if (err) return reject(err);
                    return resolve(result);
                });
            });
        });
    }
}
function supply_view(id,supplyid) {
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            con.query('select * from products where id = ? and supply_id=?', [id,supplyid],
                (err, result) => {
                    con.release();
                    if (err) return reject(err);
                    return resolve(result[0]);
                });
        });
    });
}
function supply_deleteproducts(id,supplyid){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql = "DELETE FROM products WHERE id =? and supply_id=?";
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
function supply_seachproducts(data,supplyid){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql = "SELECT products.id AS id, products.name AS name,products.slug AS slug,products.status AS status,products.branch AS branch,products.cate_id AS cate_id,category.name AS namecate,products.unit_id AS unit_id,units.code AS nameunit FROM products JOIN category ON category.id = products.cate_id JOIN units ON units.id = products.unit_id where products.supply_id=?";
            if (data.s_category !== '-1') {
                sql += ' and products.cate_id =' + data.s_category;
            }
            if (data.s_name !== '') {
                sql += ' and products.name LIKE "%'+ data.s_name +'%"';
            }
            con.query(sql,supplyid,function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}

function supply_byid(id,supplyid){
    return new Promise((resolve, reject) =>{
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql = "SELECT * FROM products where id =? and supply_id=?";
            con.query(sql,[id,supplyid],function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result[0]);
            });
        });
    });
}

function product_supply(){
    return new Promise((resolve, reject) =>{
        db.connectionDB().getConnection(function(err, con){
            if (err) throw err;
            var sql = "SELECT products.id AS id, products.name AS name,products.slug AS slug,products.status AS status,products.branch AS branch,products.cate_id AS cate_id,category.name AS namecate,products.unit_id AS unit_id,units.code AS nameunit, supply.name AS namesupply FROM products JOIN category ON category.id = products.cate_id JOIN units ON units.id = products.unit_id JOIN supply ON supply.id = products.supply_id where supply_id!=0";
            con.query(sql,function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}
module.exports ={
    all:all,
    created:created,
    updated:updated,
    view:view,
    deleteproducts:deleteproducts,
    byid:byid,
    seachproducts:seachproducts,
    supply_all:supply_all,
    supply_updated:supply_updated,
    supply_view:supply_view,
    supply_deleteproducts:supply_deleteproducts,
    supply_seachproducts:supply_seachproducts,
    supply_byid:supply_byid,
    product_supply:product_supply
}