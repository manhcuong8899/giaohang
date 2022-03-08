const db = require('../models/connectionDB');
function all(type){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql = "SELECT articles.id AS id, articles.name AS name,articles.slug AS slug,articles.status AS status,articles.cate_id AS cate_id,category.name AS namecate FROM articles JOIN category ON category.id = articles.cate_id where articles.type =?";
            con.query(sql,type,function (err,result){
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
            var sql = "SELECT articles.id AS id, articles.name AS name,articles.keywords AS keywords,articles.description AS description,articles.slug AS slug,articles.images AS images,articles.short AS short, articles.content AS content,articles.status AS status,articles.orders AS orders,articles.cate_id AS cate_id,articles.type AS type FROM articles where articles.id =?";
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
                con.query('INSERT INTO articles SET ?', data,function (err,result) {
                    con.release();
                    if (err) return reject(err);
                    return resolve(result);
                });
            });
        });
    }
}
function updated(data,contentid){
    if(data){
        return new Promise((resolve, reject) => {
            db.connectionDB().getConnection(function(err, con) {
                if (err) throw err;
                var sql    = 'UPDATE articles SET name = ?,slug = ?,images = ?,keywords = ?,description = ?,orders = ?,short = ?,content=?,cate_id= ? WHERE id=?';
                con.query(sql, [data.name,data.slug,data.images,data.keywords,data.description,data.orders,data.short,data.content,data.cate_id,contentid],function (err,result) {
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
            con.query('select * from articles where id = ?', id,
                (err, result) => {
                con.release();
                    if (err) return reject(err);
                    return resolve(result[0]);
                });
        });

    });
}
function deletearticles(id){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql = "DELETE FROM articles WHERE id =?";
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
function seacharticles(data,type){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con){
            if (err) throw err;
            var sql = "SELECT articles.id AS id, articles.name AS name,articles.slug AS slug,articles.status AS status,articles.cate_id AS cate_id,category.name AS namecate FROM articles JOIN category ON category.id = articles.cate_id where articles.type =?";
            if (data.s_category !== '-1') {
                sql += ' and articles.cate_id =' + data.s_category;
            }
            if (data.s_name !== '') {
                sql += ' and articles.name LIKE "%'+ data.s_name +'%"';
            }
            con.query(sql,type,function (err,result){
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
    deletearticles:deletearticles,
    byid:byid,
    seacharticles:seacharticles,
}