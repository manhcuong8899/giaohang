const db = require('../models/connectionDB');
function bysupply(supplyid){
    return new Promise((resolve, reject) =>{
        db.connectionDB().getConnection(function(err, con){
            if (err) throw err;
            var sql = "SELECT products.id AS id, products.name AS name,products.slug AS slug,products.status AS status,products.branch AS branch,products.cate_id AS cate_id,category.name AS namecate,products.unit_id AS unit_id,units.code AS nameunit,selling.id AS sid, selling.p_id AS pid,selling.price AS price,selling.amount AS amount,selling.name AS company,selling.address AS address,selling.phone AS phone,selling.supply_id AS supply_id FROM products JOIN category ON category.id = products.cate_id JOIN units ON units.id = products.unit_id JOIN selling ON selling.p_id = products.id  where selling.supply_id=? and products.status=2";
            con.query(sql,supplyid,function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}

function selling(){
    return new Promise((resolve, reject) =>{
        db.connectionDB().getConnection(function(err, con){
            if (err) throw err;
            var sql = "SELECT products.id AS id, products.name AS name,products.slug AS slug,products.status AS status,products.branch AS branch,products.cate_id AS cate_id,category.name AS namecate,products.unit_id AS unit_id,units.code AS nameunit,selling.id AS sid, selling.p_id AS pid,selling.price AS price,selling.amount AS amount,selling.name AS company,selling.address AS address,selling.phone AS phone,selling.supply_id AS supply_id,supply.name AS namesupply FROM products JOIN category ON category.id = products.cate_id JOIN units ON units.id = products.unit_id JOIN selling ON selling.p_id = products.id JOIN supply ON supply.id = selling.supply_id where products.status=2";
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
                con.query('INSERT INTO selling SET ?', data,function (err,result) {
                    con.release();
                    if (err) return console.log(err);
                    return resolve(result);
                });
            });
        });
    }
}
function updated(data,sid,supplyid){
    if(data){
        return new Promise((resolve, reject) => {
            db.connectionDB().getConnection(function(err, con) {
                if (err) throw err;
                var sql    = "UPDATE selling SET p_id = ?,price = ?,amount = ?,name = ?,address = ?,phone = ? WHERE id=? and supply_id = ?";
                con.query(sql, [data.p_id,data.price,data.amount,data.name,data.address,data.phone,sid,supplyid],function (err,result){
                    con.release();
                    if (err) return console.log(err);
                    return resolve(result);
                });
            });
        });
    }
}

function view(id,supplyid){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql = "select * from selling where id = ? and supply_id=?";
            con.query(sql,[id,supplyid],function (err,result){
                con.release();
                if (err) return reject(err);
                if(result){
                    return resolve(result[0]);
                }
            });
        });
    });
}
function deleteselling(id,supplyid){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql = "DELETE FROM selling WHERE id =? and supply_id=?";
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

function products(){
    return new Promise((resolve, reject) =>{
        db.connectionDB().getConnection(function(err, con){
            if (err) throw err;
            var sql = "SELECT products.id AS id, products.name AS name,products.slug AS slug,products.status AS status,products.branch AS branch,products.cate_id AS cate_id,category.name AS namecate,products.unit_id AS unit_id,units.code AS nameunit FROM products JOIN category ON category.id = products.cate_id JOIN units ON units.id = products.unit_id where products.status = 2";
            con.query(sql,function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}

function newproducts(){
    return new Promise((resolve, reject) =>{
        db.connectionDB().getConnection(function(err, con){
            if (err) throw err;
            var sql = "SELECT products.id AS id, products.name AS name,products.slug AS slug,products.images AS images,products.status AS status,products.branch AS branch,products.cate_id AS cate_id,category.name AS namecate,products.unit_id AS unit_id,units.code AS nameunit,selling.id AS sid, selling.p_id AS pid,selling.price AS price,selling.amount AS amount,selling.name AS company,selling.address AS address,selling.phone AS phone,selling.supply_id AS supply_id,supply.name AS namesupply FROM products JOIN category ON category.id = products.cate_id JOIN units ON units.id = products.unit_id JOIN selling ON selling.p_id = products.id JOIN supply ON supply.id = selling.supply_id where products.status=2 ORDER BY selling.p_id DESC LIMIT 12";
            con.query(sql,function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result);
            });

        });
    });
}

function bycode(code){
    return new Promise((resolve, reject) =>{
        db.connectionDB().getConnection(function(err, con){
            if (err) throw err;
            var sql = "SELECT products.id AS id, products.name AS name,products.slug AS slug,products.images AS images,products.status AS status,products.branch AS branch,products.cate_id AS cate_id,category.name AS namecate,products.unit_id AS unit_id,units.code AS nameunit,selling.id AS sid, selling.p_id AS pid,selling.price AS price,selling.amount AS amount,selling.name AS company,selling.address AS address,selling.phone AS phone,selling.supply_id AS supply_id,supply.name AS namesupply FROM products JOIN category ON category.id = products.cate_id JOIN units ON units.id = products.unit_id JOIN selling ON selling.p_id = products.id JOIN supply ON supply.id = selling.supply_id where products.status=2 and category.code = ?";
            con.query(sql,code,function (err,result){
               con.release();
                if (err) return reject(err);
                return resolve(result);
            });

        });
    });
}

function listproducts(code,slug){
    return new Promise((resolve, reject) =>{
        db.connectionDB().getConnection(function(err, con){
            if (err) throw err;
            var sql = "SELECT products.id AS id, products.name AS name,products.short AS short,products.slug AS slug,products.images AS images,products.status AS status,products.branch AS branch,products.cate_id AS cate_id,category.name AS namecate,products.unit_id AS unit_id,units.code AS nameunit,selling.id AS sid, selling.p_id AS pid,selling.price AS price,selling.amount AS amount,selling.name AS company,selling.address AS address,selling.phone AS phone,selling.supply_id AS supply_id,supply.name AS namesupply FROM products JOIN category ON category.id = products.cate_id JOIN units ON units.id = products.unit_id JOIN selling ON selling.p_id = products.id JOIN supply ON supply.id = selling.supply_id where products.status=2 and category.code = ? and category.slug = ?";
            con.query(sql,[code,slug],function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}
function detailproducts(slug){
    return new Promise((resolve, reject) =>{
        db.connectionDB().getConnection(function(err, con){
            if (err) throw err;
            var sql = "SELECT products.id AS id, products.name AS name,products.short AS short,products.content AS content,products.slug AS slug,products.images AS images,products.status AS status,products.branch AS branch,products.cate_id AS cate_id,category.name AS namecate,products.unit_id AS unit_id,units.code AS nameunit,selling.id AS sid, selling.p_id AS pid,selling.price AS price,selling.amount AS amount,selling.name AS company,selling.address AS address,selling.phone AS phone,selling.supply_id AS supply_id,supply.name AS namesupply FROM products JOIN category ON category.id = products.cate_id JOIN units ON units.id = products.unit_id JOIN selling ON selling.p_id = products.id JOIN supply ON supply.id = selling.supply_id where products.status=2 and products.slug = ?";
            con.query(sql,slug,function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result[0]);
            });
        });
    });
}

function findById(sid,pid){
    return new Promise((resolve, reject) =>{
        db.connectionDB().getConnection(function(err, con){
            if (err) throw err;
            var sql = "SELECT products.id AS id, products.name AS name,products.slug AS slug,products.images AS images,products.status AS status,products.branch AS branch,products.cate_id AS cate_id,category.name AS namecate,products.unit_id AS unit_id,units.code AS nameunit,selling.id AS sid, selling.p_id AS pid,selling.price AS price,selling.amount AS amount,selling.name AS company,selling.address AS address,selling.phone AS phone,selling.supply_id AS supply_id,supply.name AS namesupply FROM products JOIN category ON category.id = products.cate_id JOIN units ON units.id = products.unit_id JOIN selling ON selling.p_id = products.id JOIN supply ON supply.id = selling.supply_id where products.status=2 and selling.id = ? and selling.p_id = ?";
           con.query(sql,[sid,pid],function (err,result){
               con.release();
               if (err) return reject(err);
                return resolve(result[0]);
            });
        });

    });
}

module.exports ={
    created:created,
    updated:updated,
    view:view,
    deleteselling:deleteselling,
    bysupply:bysupply,
    products:products,
    selling:selling,
    newproducts:newproducts,
    bycode:bycode,
    listproducts:listproducts,
    detailproducts:detailproducts,
    findById:findById,
}