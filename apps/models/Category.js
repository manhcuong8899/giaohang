const db = require('../models/connectionDB');
function all(type){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql = 'SELECT * FROM category where type=?';
           con.query(sql,type,function (err,result){
               con.release();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}
function cates(type,cate_id){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql = 'SELECT * FROM category where type=? and id !=?';
            con.query(sql,[type,cate_id],function (err,result){
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
                con.query('INSERT INTO category SET ?', data,function (err,result) {
                    con.release();
                    if (err) return reject(err);
                    return resolve(result);
                });
            });
        });
    }
}
function updated(data,categoryid){
    if(data){
        return new Promise((resolve, reject) => {
            db.connectionDB().getConnection(function(err, con) {
                if (err) throw err;
                var sql    = 'UPDATE category SET code = ?,name = ?,slug = ?,keywords = ?,description = ?,orders = ? WHERE id=?';
                con.query(sql, [data.code,data.name,data.slug,data.keywords,data.description,data.orders,categoryid],function (err,result) {
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
            con.query('select * from category where id = ?', id,
                (err, result) => {
                    con.release();
                    if (err) return reject(err);
                    return resolve(result[0]);
                });
        })

    });
}

function deletecategory(id){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql = "DELETE FROM category WHERE id =?";
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

function getcate(code){
        return new Promise((resolve, reject) => {
            db.connectionDB().getConnection(function(err, con) {
                if (err) throw err;
                var sql = "SELECT * FROM category where code=?";
                con.query(sql, code,function (err,result) {
                    con.release();
                    if (err) return reject(err);
                    return resolve(result);
                });
            });

        });
}

function byslug(code,slug) {
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql = 'SELECT * FROM category where code =? and slug =?';
            con.query(sql,[code,slug],function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result[0]);
            });
        });
    });
}
module.exports ={
    all:all,
    created:created,
    updated:updated,
    view:view,
    deletecategory:deletecategory,
    cates:cates,
    getcate:getcate,
    byslug:byslug,
}