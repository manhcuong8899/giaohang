const db = require('../models/connectionDB');
function all(){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql = "SELECT * FROM images";
            con.query(sql,function (err,result){
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
                con.query('INSERT INTO images SET ?', data,function (err,result) {
                    con.release();
                    if (err) return reject(err);
                    return resolve(result);
                });
            });
        });
    }
}
function updated(data,imgid){
    if(data){
        return new Promise((resolve, reject) => {
            db.connectionDB().getConnection(function(err, con) {
                if (err) throw err;
                var sql    = 'UPDATE images SET name = ?,slug = ?,images = ?,link = ?, short = ?,type = ?,orders = ? WHERE id=?';
                con.query(sql, [data.name,data.slug,data.images,data.link,data.short,data.type,data.orders,imgid],function (err,result) {
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
            con.query('select * from images where id = ?', id,
                (err, result) => {
                con.release();
                    if (err) return reject(err);
                    return resolve(result[0]);
                });
        });

    });
}
function deleteimages(id){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql = "DELETE FROM images WHERE id =?";
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

module.exports ={
    all:all,
    created:created,
    updated:updated,
    view:view,
    deleteimages:deleteimages,
}