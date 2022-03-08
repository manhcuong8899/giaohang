const db = require('../models/connectionDB');
function created(data){
    if(data){
        return new Promise((resolve, reject) => {
            db.connectionDB().getConnection(function(err, con) {
                if (err) throw err;
                var sql = "INSERT INTO delivery SET ?;SELECT * FROM delivery where code =?;";
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
            var sql = "DELETE FROM delivery WHERE id =?";
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
            var sql = "DELETE FROM delivery_detail WHERE order_id =?";
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
            var sql = "SELECT delivery.id AS id, delivery.code AS code,delivery.phone AS phone,delivery.full_name AS full_name,delivery.address AS address,delivery.addressshop AS addressshop,delivery.city AS city,delivery.district AS district,delivery.status AS status,delivery.created_at AS created_at,delivery.shop_id AS shop_id,delivery.feeorder AS feeorder,delivery.totalmoney AS  totalmoney,delivery.feeship AS  feeship, status_delivery.name AS statusname,locale.name AS cityname,district.name AS districtname,wards.name AS wardsname,shop.name AS shopname FROM delivery JOIN status_delivery ON status_delivery.id = delivery.status JOIN locale ON locale.code = delivery.city JOIN shop ON shop.id = delivery.shop_id JOIN district ON district.code = delivery.district JOIN wards ON wards.code = delivery.wards where delivery.id =? ORDER BY delivery.id DESC";
            con.query(sql,[id],function (err,result){
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
            con.query('select id from delivery where code = ?', code,
                (err, result) => {
                    con.release();
                    if (err) return reject(err);
                    return resolve(result[0].id);
                });
        });
    });
}
function getordershipper_id(code) {
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            con.query('select shipper_id from delivery where code = ?', code,
                (err, result) => {
                    con.release();
                    if (err) return reject(err);
                    return resolve(result[0].shipper_id);
                });
        });
    });
}
function createddetail(data){
    if(data){
        return new Promise((resolve, reject) => {
            db.connectionDB().getConnection(function(err, con) {
                if (err) throw err;
                var sql = "INSERT INTO delivery_detail SET ?";
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
            con.query('select * from delivery_detail where order_id = ?', id,
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
            con.query('select * from status_delivery',
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
            var sql = "SELECT delivery.id AS id, delivery.code AS code,delivery.phone AS phone,delivery.full_name AS full_name,delivery.address AS address,delivery.city AS city,delivery.district AS district,delivery.status AS status,delivery.created_at AS created_at,delivery.shop_id AS shop_id,delivery.feeorder AS feeorder,delivery.totalmoney AS  totalmoney,delivery.feeship AS  feeship, status_delivery.name AS statusname,locale.name AS cityname,district.name AS districtname,shop.name AS shopname FROM delivery JOIN status_delivery ON status_delivery.id = delivery.status JOIN locale ON locale.code = delivery.city JOIN shop ON shop.id = delivery.shop_id JOIN district ON district.code = delivery.district ORDER BY delivery.id DESC";
            con.query(sql,function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}

function listbystatus(status){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err,con) {
            if (err) throw err;
            var sql = "SELECT delivery.id AS id, delivery.code AS code,delivery.phone AS phone,delivery.full_name AS full_name,delivery.address AS address,delivery.city AS city,delivery.district AS district,delivery.status AS status,delivery.created_at AS created_at,delivery.shop_id AS shop_id,delivery.feeorder AS feeorder,delivery.totalmoney AS  totalmoney,delivery.feeship AS  feeship, status_delivery.name AS statusname,locale.name AS cityname,district.name AS districtname,shop.name AS shopname FROM delivery JOIN status_delivery ON status_delivery.id = delivery.status JOIN locale ON locale.code = delivery.city JOIN shop ON shop.id = delivery.shop_id JOIN district ON district.code = delivery.district where status_delivery.code =? ORDER BY delivery.id DESC";
            con.query(sql,[status],function (err,result){
                con.release();
                if (err) return reject(err);
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
           let sql = "SELECT delivery.id AS id, delivery.code AS code,delivery.phone AS phone,delivery.full_name AS full_name,delivery.address AS address,delivery.city AS city,delivery.district AS district,delivery.status AS status,delivery.created_at AS created_at,delivery.shop_id AS shop_id,delivery.feeorder AS feeorder,delivery.totalmoney AS  totalmoney,delivery.feeship AS  feeship, status_delivery.name AS statusname,locale.name AS cityname,district.name AS districtname,shop.name AS shopname FROM delivery JOIN status_delivery ON status_delivery.id = delivery.status JOIN locale ON locale.code = delivery.city JOIN shop ON shop.id = delivery.shop_id JOIN district ON district.code = delivery.district  where 1=1";
            if (data.s_status !== '-1') {
                sql += ' and delivery.status =' + data.s_status;
            }
            if (data.s_city !== '-1') {
                sql += ' and delivery.city = '+ data.s_city;
            }
            if (data.s_code !== '') {
                sql += ' and delivery.code LIKE "%'+ data.s_code +'%"';
            }
                sql +=' ORDER BY delivery.id DESC';
            con.query(sql,function (err,result){
                con.release();
                if (err) return ;
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
                var sql    = 'UPDATE delivery SET status = 2 WHERE id=?';
                con.query(sql, [orid],function (err,result) {
                    con.release();
                    if (err) return reject(err);
                    return resolve(result);
                });
            });
        });
}
function cancel(orid){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql    = 'UPDATE delivery SET status = 9 WHERE id=?';
            con.query(sql, [orid],function (err,result) {
                con.release();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}
function addshipper(data,orid){
    if(data){
        return new Promise((resolve, reject) => {
            db.connectionDB().getConnection(function(err, con) {
                if (err) throw err;
                var sql    = 'UPDATE delivery SET shipper_id = ?, status = 3 WHERE id=?';
                con.query(sql, [data.shipper_id,orid],function (err,result) {
                    con.release();
                    if (err) return console.log(err);
                    return resolve(result);
                });
            });
        });
    }
}

function addstatus(data,orid){
    if(data){
        return new Promise((resolve, reject) => {
            db.connectionDB().getConnection(function(err, con) {
                if (err) throw err;
                var sql    = 'UPDATE delivery SET status = ? WHERE id=?';
                con.query(sql, [data.status,orid],function (err,result) {
                    con.release();
                    if (err) return console.log(err);
                    return resolve(result);
                });
            });
        });
    }
}
function shop_all(shopid){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err,con) {
            if (err) throw err;
            var sql = "SELECT delivery.id AS id, delivery.code AS code,delivery.phone AS phone,delivery.full_name AS full_name,delivery.address AS address,delivery.city AS city,delivery.district AS district,delivery.status AS status,delivery.created_at AS created_at,delivery.shop_id AS shop_id,delivery.feeorder AS feeorder,delivery.totalmoney AS  totalmoney,delivery.feeship AS  feeship, status_delivery.name AS statusname,locale.name AS cityname,district.name AS districtname,shop.name AS shopname FROM delivery JOIN status_delivery ON status_delivery.id = delivery.status JOIN locale ON locale.code = delivery.city JOIN shop ON shop.id = delivery.shop_id JOIN district ON district.code = delivery.district where delivery.shop_id = ? ORDER BY delivery.id DESC";
            con.query(sql,[shopid],function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}
function shop_listbystatus(status,shopid){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err,con) {
            if (err) throw err;
            var sql = "SELECT delivery.id AS id, delivery.code AS code,delivery.phone AS phone,delivery.full_name AS full_name,delivery.address AS address,delivery.city AS city,delivery.district AS district,delivery.status AS status,delivery.created_at AS created_at,delivery.shop_id AS shop_id,delivery.feeorder AS feeorder,delivery.totalmoney AS  totalmoney,delivery.feeship AS  feeship, status_delivery.name AS statusname,locale.name AS cityname,district.name AS districtname,shop.name AS shopname FROM delivery JOIN status_delivery ON status_delivery.id = delivery.status JOIN locale ON locale.code = delivery.city JOIN shop ON shop.id = delivery.shop_id JOIN district ON district.code = delivery.district where status_delivery.code =? and delivery.shop_id =?  ORDER BY delivery.id DESC";
            con.query(sql,[status,shopid],function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}
function shop_seach(data,shopid){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err,con) {
            const params = [];
            if (err) throw err;
            let sql = "SELECT delivery.id AS id, delivery.code AS code,delivery.phone AS phone,delivery.full_name AS full_name,delivery.address AS address,delivery.city AS city,delivery.district AS district,delivery.status AS status,delivery.created_at AS created_at,delivery.shop_id AS shop_id,delivery.feeorder AS feeorder,delivery.totalmoney AS  totalmoney,delivery.feeship AS  feeship, status_delivery.name AS statusname,locale.name AS cityname,district.name AS districtname,shop.name AS shopname FROM delivery JOIN status_delivery ON status_delivery.id = delivery.status JOIN locale ON locale.code = delivery.city JOIN shop ON shop.id = delivery.shop_id JOIN district ON district.code = delivery.district  where delivery.shop_id = ?";
            if (data.s_status !== '-1') {
                sql += ' and delivery.status =' + data.s_status;
            }
            if (data.s_city !== '-1') {
                sql += ' and delivery.city = '+ data.s_city;
            }
            if (data.s_code !== '') {
                sql += ' and delivery.code LIKE "%'+ data.s_code +'%"';
            }
            if (data.s_phone !== '') {
                sql += ' and delivery.phone LIKE "%'+ data.s_phone +'%"';
            }
            sql +=' ORDER BY delivery.id DESC';
            con.query(sql,[shopid],function (err,result){
                con.release();
                if (err) return console.log(err) ;
                return resolve(result);
            });
        });
    });
}

function s_total(shopid){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err,con) {
            if (err) throw err;
            var sql = "SELECT  COUNT(delivery.id) AS drap FROM delivery where status = 0 and shop_id = ?;" +
                "SELECT  COUNT(delivery.id) AS new FROM delivery where status = 1 and shop_id = ?;" +
                "SELECT  COUNT(delivery.id) AS confirm FROM delivery where status = 2 and shop_id = ?;" +
                "SELECT  COUNT(delivery.id) AS takeship FROM delivery where status = 3 and shop_id = ?;" +
                "SELECT  COUNT(delivery.id) AS receivedship FROM delivery where status = 4 and shop_id = ?;" +
                "SELECT  COUNT(delivery.id) AS shipping FROM delivery where status = 5 and shop_id = ?;" +
                "SELECT  COUNT(delivery.id) AS finish FROM delivery where status = 6 and shop_id = ?;" +
                "SELECT  COUNT(delivery.id) AS sreturn FROM delivery where status = 7 and shop_id = ?;" +
                "SELECT  COUNT(delivery.id) AS returnshop FROM delivery where status = 8 and shop_id = ?;" +
                "SELECT  COUNT(delivery.id) AS cancel FROM delivery where status = 9 and shop_id = ?;" +
                "SELECT  COUNT(delivery.id) AS checking FROM delivery where status = 10 and shop_id = ?;" +
                "SELECT  COUNT(delivery.id) AS checked FROM delivery where status = 11 and shop_id = ?;" +
                "SELECT  COUNT(delivery.id) AS delivery FROM delivery where shop_id = ?";
            con.query(sql,[shopid,shopid,shopid,shopid,shopid,shopid,shopid,shopid,shopid,shopid,shopid,shopid,shopid],function (err,result){
                con.release();
                if (err) return console.log(err);
                return resolve(result);
            });
        });
    });
}
function summoney(shopid){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err,con) {
            if (err) throw err;
            var sql = "SELECT  SUM (delivery.totalmoney) AS totalmoney FROM delivery where status!= 0 or status BETWEEN 7 AND 9 and shop_id = ?;" +
                "SELECT  SUM (delivery.feeorder) AS feeorder FROM delivery where status!= 0 or status BETWEEN 7 AND 9 and shop_id = ?;" +
                "SELECT  SUM (delivery.feeship) AS feeship FROM delivery where status!= 0 or status BETWEEN 7 AND 9 and shop_id = ?"
            con.query(sql,[shopid,shopid,shopid],function (err,result){
                con.release();
                if (err) return console.log(err);
                return resolve(result);
            });
        });
    });
}
function status_new(){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err,con) {
            if (err) throw err;
            var sql = "SELECT delivery.id AS id, delivery.code AS code,delivery.phone AS phone,delivery.full_name AS full_name,delivery.address AS address,delivery.city AS city,delivery.district AS district,delivery.status AS status,delivery.created_at AS created_at,delivery.shop_id AS shop_id,delivery.feeorder AS feeorder,delivery.totalmoney AS  totalmoney,delivery.feeship AS  feeship, status_delivery.name AS statusname,locale.name AS cityname,district.name AS districtname,shop.name AS shopname FROM delivery JOIN status_delivery ON status_delivery.id = delivery.status JOIN locale ON locale.code = delivery.city JOIN shop ON shop.id = delivery.shop_id JOIN district ON district.code = delivery.district where delivery.status = 1 ORDER BY delivery.id DESC";
            con.query(sql,function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}
function status_chuachuyen(){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err,con) {
            if (err) throw err;
            var sql = "SELECT delivery.id AS id, delivery.code AS code,delivery.phone AS phone,delivery.full_name AS full_name,delivery.address AS address,delivery.city AS city,delivery.district AS district,delivery.status AS status,delivery.created_at AS created_at,delivery.shop_id AS shop_id,delivery.feeorder AS feeorder,delivery.totalmoney AS  totalmoney,delivery.feeship AS  feeship, status_delivery.name AS statusname,locale.name AS cityname,district.name AS districtname,shop.name AS shopname FROM delivery JOIN status_delivery ON status_delivery.id = delivery.status JOIN locale ON locale.code = delivery.city JOIN shop ON shop.id = delivery.shop_id JOIN district ON district.code = delivery.district where delivery.status BETWEEN 1 AND 3 ORDER BY delivery.id DESC";
            con.query(sql,function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}

function status_giaokhach(){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err,con) {
            if (err) throw err;
            var sql = "SELECT delivery.id AS id, delivery.code AS code,delivery.phone AS phone,delivery.full_name AS full_name,delivery.address AS address,delivery.city AS city,delivery.district AS district,delivery.status AS status,delivery.created_at AS created_at,delivery.shop_id AS shop_id,delivery.feeorder AS feeorder,delivery.totalmoney AS  totalmoney,delivery.feeship AS  feeship, status_delivery.name AS statusname,locale.name AS cityname,district.name AS districtname,shop.name AS shopname FROM delivery JOIN status_delivery ON status_delivery.id = delivery.status JOIN locale ON locale.code = delivery.city JOIN shop ON shop.id = delivery.shop_id JOIN district ON district.code = delivery.district where delivery.status BETWEEN 4 AND 6 ORDER BY delivery.id DESC";
            con.query(sql,function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}
function status_trahuy(){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err,con) {
            if (err) throw err;
            var sql = "SELECT delivery.id AS id, delivery.code AS code,delivery.phone AS phone,delivery.full_name AS full_name,delivery.address AS address,delivery.city AS city,delivery.district AS district,delivery.status AS status,delivery.created_at AS created_at,delivery.shop_id AS shop_id,delivery.feeorder AS feeorder,delivery.totalmoney AS  totalmoney,delivery.feeship AS  feeship, status_delivery.name AS statusname,locale.name AS cityname,district.name AS districtname,shop.name AS shopname FROM delivery JOIN status_delivery ON status_delivery.id = delivery.status JOIN locale ON locale.code = delivery.city JOIN shop ON shop.id = delivery.shop_id JOIN district ON district.code = delivery.district where delivery.status BETWEEN 7 AND 9 ORDER BY delivery.id DESC";
            con.query(sql,function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}

function status_doisoat(){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err,con) {
            if (err) throw err;
            var sql = "SELECT delivery.id AS id, delivery.code AS code,delivery.phone AS phone,delivery.full_name AS full_name,delivery.address AS address,delivery.city AS city,delivery.district AS district,delivery.status AS status,delivery.created_at AS created_at,delivery.shop_id AS shop_id,delivery.feeorder AS feeorder,delivery.totalmoney AS  totalmoney,delivery.feeship AS  feeship, status_delivery.name AS statusname,locale.name AS cityname,district.name AS districtname,shop.name AS shopname FROM delivery JOIN status_delivery ON status_delivery.id = delivery.status JOIN locale ON locale.code = delivery.city JOIN shop ON shop.id = delivery.shop_id JOIN district ON district.code = delivery.district where delivery.status BETWEEN 10 AND 11 ORDER BY delivery.id DESC";
            con.query(sql,function (err,result){
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
    confirm:confirm,
    cancel:cancel,
    addshipper:addshipper,
    getordershipper_id:getordershipper_id,
    addstatus:addstatus,
    shop_all:shop_all,
    shop_listbystatus:shop_listbystatus,
    shop_seach:shop_seach,
    s_total:s_total,
    summoney:summoney,
    status_chuachuyen:status_chuachuyen,
    status_giaokhach:status_giaokhach,
    status_trahuy:status_trahuy,
    status_doisoat:status_doisoat
}