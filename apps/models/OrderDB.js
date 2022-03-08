const db = require('../models/connectionDB');
function created(data){
    if(data){
        return new Promise((resolve, reject) => {
            db.connectionDB().getConnection(function(err, con) {
                if (err) throw err;
                var sql = "INSERT INTO orders SET ?;SELECT * FROM orders where code =?;";
                con.query(sql,[data,data.code],function (err,result) {
                    con.release();
                    if (err) return reject(err);
                    return resolve(result);
                });
            });
        });
    }
}

function updated(data,orid){
    if(data){
        return new Promise((resolve, reject) => {
            db.connectionDB().getConnection(function(err, con) {
                if (err) throw err;
                var sql    = 'UPDATE orders SET full_name = ?,address = ?,phone = ?,deliverydate = ?,feeship = ?,feebuy = ?,feepack = ?,status = ? WHERE id=?';
                con.query(sql, [data.full_name,data.address,data.phone,data.deliverydate,data.feeship,data.feebuy,data.feepack,data.status,orid],function (err,result) {
                    con.release();
                    if (err) return console.log(err);
                    return resolve(result);
                });
            });
        });
    }
}

function deleteorder(id){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql = "DELETE FROM orders WHERE id =?";
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
function deleteorderdetail(id){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql = "DELETE FROM order_detail WHERE order_id =?";
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
function view(id){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            var sql = "SELECT orders.id AS id, orders.code AS code,orders.totals AS totals,orders.totalqty AS totalqty,orders.created_at AS created_at,orders.email AS email,orders.full_name AS full_name,orders.address AS address,orders.phone AS phone,orders.status AS status,orders.deliverydate AS deliverydate,orders.feeship AS feeship,orders.feebuy AS feebuy,orders.feepack AS feepack,orders.deposit AS deposit, status_order.name AS statusname,locale.name AS cityname,users.full_name AS userfull_name,users.username AS username,users.phone AS userphone FROM orders JOIN status_order ON status_order.id = orders.status JOIN locale ON locale.code = orders.city JOIN users ON users.id = orders.customer_id";
            con.query(sql,function (err,result){
                con.release();
                    if (err) return reject(err);
                    return resolve(result[0]);
                });
        });
    });
}
function getorderid(code) {
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            con.query('select id from orders where code = ?', code,
                (err, result) => {
                    con.release();
                    if (err) return reject(err);
                    return resolve(result[0].id);
                });
        });
    });
}
function createddetail(data){
    if(data){
        return new Promise((resolve, reject) => {
            db.connectionDB().getConnection(function(err, con) {
                if (err) throw err;
                var sql = "INSERT INTO order_detail SET ?";
                con.query(sql,[data],function (err,result) {
                    con.release();
                    if (err) return console.log(err);
                    return resolve(result);
                });
            });
        });
    }
}

function listdetail(id) {
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            con.query('select * from order_detail where order_id = ?', id,
                (err, result) => {
                    con.release();
                    if (err) return reject(err);
                    return resolve(result);
                });
        });
    });
}

function liststatus() {
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            con.query('select * from status_order',
                (err, result) => {
                    con.release();
                    if (err) return reject(err);
                    return resolve(result);
                });
        });
    });
}

function all(){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err,con) {
            if (err) throw err;
            var sql = "SELECT orders.id AS id, orders.code AS code,orders.totals AS totals,orders.totalqty AS totalqty,orders.created_at AS created_at,orders.email AS email,orders.full_name AS full_name,orders.address AS address,orders.phone AS phone,orders.deliverydate AS deliverydate,orders.feeship AS feeship,orders.deposit AS  deposit,orders.feebuy AS  feebuy, status_order.name AS statusname,locale.name AS cityname FROM orders JOIN status_order ON status_order.id = orders.status JOIN locale ON locale.code = orders.city";
            con.query(sql,function (err,result){
                con.release();
                if (err) return console.log(err);
                return resolve(result);
            });
        });
    });
}

function listbystatus(status){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err,con) {
            if (err) throw err;
            var sql = "SELECT orders.id AS id, orders.code AS code,orders.totals AS totals,orders.totalqty AS totalqty,orders.created_at AS created_at,orders.email AS email,orders.full_name AS full_name,orders.address AS address,orders.phone AS phone,orders.deliverydate AS deliverydate,orders.feeship AS feeship,orders.deposit AS  deposit,orders.feebuy AS  feebuy,status_order.name AS statusname,locale.name AS cityname FROM orders JOIN status_order ON status_order.id = orders.status JOIN locale ON locale.code = orders.city where status_order.code = ?";
            con.query(sql,[status],function (err,result){
                con.release();
                if (err) return console.log(err);
                return resolve(result);
            });
        });
    });
}

function seach(data){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err,con) {
            const params = [];
            if (err) throw err;
           let sql = "SELECT orders.id AS id, orders.code AS code,orders.totals AS totals,orders.totalqty AS totalqty,orders.created_at AS created_at,orders.email AS email,orders.full_name AS full_name,orders.address AS address,orders.phone AS phone,orders.deliverydate AS deliverydate,orders.status AS status,orders.feeship AS feeship,orders.deposit AS  deposit,orders.feebuy AS  feebuy,status_order.name AS statusname,locale.name AS cityname FROM orders JOIN status_order ON status_order.id = orders.status JOIN locale ON locale.code = orders.city where 1=1";
            if (data.s_status !== '-1') {
                sql += ' and orders.status =' + data.s_status;
                params.push(data.s_status);
            }
            if (data.s_city !== '-1') {
                sql += ' and orders.city = '+ data.s_city;
                params.push(data.s_city);
            }
            if (data.s_fullname !== '') {
                sql += ' and orders.full_name LIKE "%'+ data.s_fullname +'%"';
                params.push(data.s_fullname);
            }
            if (data.s_phone !== '') {
                sql += ' and orders.phone LIKE "%'+ data.s_phone +'%"';
                params.push(data.s_phone);
            }
            con.query(sql,function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}
function m_neworder(userid){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err,con) {
            if (err) throw err;
            var sql = "SELECT orders.id AS id, orders.code AS code,orders.totals AS totals,orders.totalqty AS totalqty,orders.created_at AS created_at,orders.email AS email,orders.full_name AS full_name,orders.address AS address,orders.phone AS phone,orders.deliverydate AS deliverydate,orders.status AS status,orders.feeship AS feeship,orders.deposit AS deposit,orders.feebuy AS feebuy,orders.feepack AS feepack,status_order.name AS statusname,locale.name AS cityname FROM orders JOIN status_order ON status_order.id = orders.status JOIN locale ON locale.code = orders.city where (orders.status = 1 or orders.status = 2 or orders.status = 3) and customer_id = ?";
            con.query(sql,[userid],function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}

function m_depositorder(userid){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err,con) {
            if (err) throw err;
            var sql = "SELECT orders.id AS id, orders.code AS code,orders.totals AS totals,orders.totalqty AS totalqty,orders.created_at AS created_at,orders.email AS email,orders.full_name AS full_name,orders.address AS address,orders.phone AS phone,orders.deliverydate AS deliverydate,orders.status AS status,orders.feeship AS feeship,orders.deposit AS  deposit,orders.feebuy AS  feebuy,orders.feepack AS feepack, status_order.name AS statusname,locale.name AS cityname FROM orders JOIN status_order ON status_order.id = orders.status JOIN locale ON locale.code = orders.city where (orders.status = 4 or orders.status = 5) and customer_id = ?";
            con.query(sql,[userid],function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}

function m_shiporder(userid){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err,con) {
            if (err) throw err;
            var sql = "SELECT orders.id AS id, orders.code AS code,orders.totals AS totals,orders.totalqty AS totalqty,orders.created_at AS created_at,orders.email AS email,orders.full_name AS full_name,orders.address AS address,orders.phone AS phone,orders.deliverydate AS deliverydate,orders.status AS status,orders.feeship AS feeship,orders.deposit AS  deposit,orders.feebuy AS  feebuy,orders.feepack AS feepack,status_order.name AS statusname,locale.name AS cityname FROM orders JOIN status_order ON status_order.id = orders.status JOIN locale ON locale.code = orders.city where (orders.status = 6 or orders.status = 7 or orders.status = 8 ) and customer_id = ?";
            con.query(sql,[userid],function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}

function m_finishorder(userid){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err,con) {
            if (err) throw err;
            var sql = "SELECT orders.id AS id, orders.code AS code,orders.totals AS totals,orders.totalqty AS totalqty,orders.created_at AS created_at,orders.email AS email,orders.full_name AS full_name,orders.address AS address,orders.phone AS phone,orders.deliverydate AS deliverydate,orders.status AS status,orders.feeship AS feeship,orders.deposit AS  deposit,orders.feebuy AS  feebuy,orders.feepack AS feepack,status_order.name AS statusname,locale.name AS cityname FROM orders JOIN status_order ON status_order.id = orders.status JOIN locale ON locale.code = orders.city where orders.status = 9 and customer_id = ?";
            con.query(sql,[userid],function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}
function confirm(orid){
        return new Promise((resolve, reject) => {
            db.connectionDB().getConnection(function(err, con) {
                if (err) throw err;
                var sql    = 'UPDATE orders SET status = 3 WHERE id=?';
                con.query(sql, [orid],function (err,result) {
                    con.release();
                    if (err) return reject(err);
                    return resolve(result);
                });
            });
        });
}

module.exports ={
    created:created,
    updated:updated,
    deleteorder:deleteorder,
    deleteorderdetail:deleteorderdetail,
    view:view,
    getorderid:getorderid,
    createddetail:createddetail,
    all:all,
    seach:seach,
    listdetail:listdetail,
    liststatus:liststatus,
    listbystatus:listbystatus,
    m_neworder:m_neworder,
    m_depositorder:m_depositorder,
    m_shiporder:m_shiporder,
    m_finishorder:m_finishorder,
    confirm:confirm
}