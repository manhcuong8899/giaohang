const db = require('../models/connectionDB');
function register(data){
    if(data){
        return new Promise((resolve, reject) => {
            db.connectionDB().getConnection(function(err,con) {
                if (err) throw err;
                con.query('INSERT INTO users SET ?', data,function (err,result) {
                    con.release();
                    if (err) return reject(err);
                    return resolve(result);
                });
            });
        });
    }
}
function updated(data,userid){
    if(data){
        return new Promise((resolve, reject) => {
            db.connectionDB().getConnection(function(err,con) {
                if (err) throw err;
                var sql    = 'UPDATE users SET full_name = ?,email = ?,birthday = ?,address = ?,role_id = ?,branch_id=?,status = ? WHERE id=?';
                con.query(sql, [data.full_name,data.email,data.birthday,data.address,data.roles,data.branch_id,data.status,userid],function (err,result) {
                    con.release();
                    if (err) return reject(err);
                    return resolve(result);
                });
            });
        });
    }
}

function memberupdated(data,userid){
    if(data){
        return new Promise((resolve, reject) => {
            db.connectionDB().getConnection(function(err,con) {
                if (err) throw err;
                var sql    = 'UPDATE users SET username = ?,full_name = ?,email = ?,address = ?,password = ? WHERE id=?';
                con.query(sql, [data.username,data.full_name,data.email,data.address,data.password,userid],function (err,result) {
                    con.release();
                    if (err) return reject(err);
                    return resolve(result);
                });
            });
        });
    }
}
function memberupdatednopass(data,userid){
    if(data){
        return new Promise((resolve, reject) => {
            db.connectionDB().getConnection(function(err,con) {
                if (err) throw err;
                var sql    = 'UPDATE users SET username = ?,full_name = ?,email = ?,address = ? WHERE id=?';
                con.query(sql, [data.username,data.full_name,data.email,data.address,userid],function (err,result) {
                    con.release();
                    if (err) return reject(err);
                    return resolve(result);
                });
            });
        });
    }
}
function all(){
        return new Promise((resolve, reject) => {
            db.connectionDB().getConnection(function(err,con) {
                if (err) throw err;
                var sql = "SELECT users.id AS id, users.full_name AS full_name,users.username AS username,users.status AS status,roles.label AS rolesname,branch.name AS branchname FROM users JOIN roles ON roles.id = users.role_id JOIN branch ON branch.id = users.branch_id where type_user=1";
                con.query(sql,function (err,result){
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
            let sql = 'SELECT users.id AS id, users.full_name AS full_name,users.username AS username,users.status AS status,roles.label AS rolesname,branch.name AS branchname FROM users JOIN roles ON roles.id = users.role_id JOIN branch ON branch.id = users.branch_id where type_user=1';
            if (data.s_roles !== '-1') {
                sql += ' and users.role_id =' + data.s_roles;
                params.push(data.s_roles);
            }
            if (data.s_branch !== '-1') {
                sql += ' and users.branch_id = '+ data.s_branch;
                params.push(data.s_branch);
            }
            if (data.s_fullname !== '') {
                sql += ' and users.full_name LIKE "%'+ data.s_fullname +'%"';
                params.push(data.s_branch);
            }
            if (data.s_phone !== '') {
                sql += ' and users.phone LIKE "%'+ data.s_phone +'%"';
                params.push(data.s_branch);
            }
            con.query(sql,function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}
function getUsername(username) {
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            var sql = 'SELECT users.id AS id,users.password AS password, users.full_name AS full_name,users.username AS username,users.status AS status,users.no_delete AS no_delete,users.type_user AS type_user, users.supply_id AS supply_id, users.shop_id AS shop_id, roles.name AS rolesname FROM users JOIN roles ON roles.id = users.role_id where users.username = ?';
            con.query(sql, username, function(err, result) {
                con.release();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}

function getMemberUser(username) {
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            var sql = 'SELECT * FROM users where username = ?';
            con.query(sql, username, function(err, result) {
                con.release();
                if (err) return reject(err);
                return resolve(result[0]);
            });
        });
    });
}

function deleteuser(id){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql = "DELETE FROM users WHERE id =?";
            con.query(sql,id,function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}

function view(id) {
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            con.query('select * from users where id = ?', id,
                (err, result) => {
                con.release();
                    if (err) return reject(err);
                    return resolve(result[0]);
                });
        });

    });
}

function getUserid(username) {
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            con.query('select * from users where username = ?', username,
                (err, result) => {
                con.release();
                    if (err) return reject(err);
                    return resolve(result[0].id);
                });
        });

    });
}
function shops(){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql = "SELECT users.id AS id, users.full_name AS full_name,users.username AS username,users.status AS status,users.no_delete AS no_delete,roles.label AS rolesname,shop.name AS shopsname FROM users JOIN roles ON roles.id = users.role_id JOIN shop ON shop.id = users.shop_id where type_user=2";
            con.query(sql,function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}
function shopsview(id) {
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            con.query('select * from users where id = ?',id,
                (err, result) => {
                    con.release();
                    if (err) return reject(err);
                    return resolve(result[0]);
                });
        });
    });
}
function updatedshops(data,userid){
    if(data){
        return new Promise((resolve, reject) => {
            db.connectionDB().getConnection(function(err, con)  {
                if (err) throw err;
                var sql    = 'UPDATE users SET full_name = ?,email = ?,birthday = ?,address = ?,status=?,role_id = ? WHERE id=?';
                con.query(sql, [data.full_name,data.email,data.birthday,data.address,data.roles,data.status,userid],function (err,result) {
                    con.release();
                    if (err) return reject(err);
                    return resolve(result);
                });
            });
        });
    }
}
function seachshops(data){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql = "SELECT users.id AS id, users.full_name AS full_name,users.username AS username,users.status AS status,users.no_delete AS no_delete,roles.label AS rolesname,shop.name AS shopsname FROM users JOIN roles ON roles.id = users.role_id JOIN shop ON shop.id = users.shop_id where type_user=2";
            if (data.s_roles !== '-1') {
                sql += ' and users.role_id =' + data.s_roles;
            }
            if (data.s_shop !== '-1') {
                sql += ' and users.shop_id = '+ data.s_shop;
            }
            if (data.s_fullname !== '') {
                sql += ' and users.full_name LIKE "%'+ data.s_fullname +'%"';
            }
            if (data.s_phone !== '') {
                sql += ' and users.phone LIKE "%'+ data.s_phone +'%"';
            }
            con.query(sql,function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}

function supplies(){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql = "SELECT users.id AS id, users.full_name AS full_name,users.username AS username,users.status AS status,users.no_delete AS no_delete,roles.label AS rolesname,supply.name AS supplyname FROM users JOIN roles ON roles.id = users.role_id JOIN supply ON supply.id = users.supply_id where type_user=3";
            con.query(sql,function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}
function suppliesview(id) {
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            con.query('select * from users where id = ?',id,
                (err, result) => {
                con.release();
                    if (err) return reject(err);
                    return resolve(result[0]);
                });
        });

    });
}
function updatedsupplies(data,userid){
    if(data){
        return new Promise((resolve, reject) => {
            db.connectionDB().getConnection(function(err, con){
                if (err) throw err;
                var sql    = 'UPDATE users SET full_name = ?,email = ?,birthday = ?,address = ?,status=?,role_id = ? WHERE id=?';
                con.query(sql, [data.full_name,data.email,data.birthday,data.address,data.status,data.roles,userid],function (err,result) {
                    con.release();
                    if (err) return reject(err);
                    return resolve(result);
                });
            });
        });
    }
}
function seachsupplies(data){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con){
            if (err) throw err;
            var sql = "SELECT users.id AS id, users.full_name AS full_name,users.username AS username,users.status AS status,users.no_delete AS no_delete,roles.label AS rolesname,supply.name AS supplyname FROM users JOIN roles ON roles.id = users.role_id JOIN supply ON supply.id = users.supply_id where type_user=3";
            if (data.s_roles !== '-1') {
                sql += ' and users.role_id =' + data.s_roles;
            }
            if (data.s_supply !== '-1') {
                sql += ' and users.supply_id = '+ data.s_supply;
            }
            if (data.s_fullname !== '') {
                sql += ' and users.full_name LIKE "%'+ data.s_fullname +'%"';
            }
            if (data.s_phone !== '') {
                sql += ' and users.phone LIKE "%'+ data.s_phone +'%"';
            }
            con.query(sql,function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}

function seachuserssupplies(data,supplyid){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql = "SELECT users.id AS id, users.full_name AS full_name,users.username AS username,users.status AS status,users.no_delete AS no_delete,roles.label AS rolesname,supply.name AS supplyname FROM users JOIN roles ON roles.id = users.role_id JOIN supply ON supply.id = users.supply_id where type_user=3 and supply_id=?";
            if (data.s_roles !== '-1') {
                sql += ' and users.role_id =' + data.s_roles;
            }
            if (data.s_fullname !== '') {
                sql += ' and users.full_name LIKE "%'+ data.s_fullname +'%"';
            }
            con.query(sql,supplyid,function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}

function seachusersshop(data,shopid){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql = "SELECT users.id AS id, users.full_name AS full_name,users.username AS username,users.status AS status,users.no_delete AS no_delete,roles.label AS rolesname,shop.name AS shopname FROM users JOIN roles ON roles.id = users.role_id JOIN shop ON shop.id = users.shop_id where type_user=2 and shop_id=?";
            if (data.s_roles !== '-1') {
                sql += ' and users.role_id =' + data.s_roles;
            }
            if (data.s_fullname !== '') {
                sql += ' and users.full_name LIKE "%'+ data.s_fullname +'%"';
            }
            con.query(sql,shopid,function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}


function suppliesusers(id){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql = "SELECT users.id AS id, users.full_name AS full_name,users.username AS username,users.status AS status,users.no_delete AS no_delete,roles.label AS rolesname,supply.name AS supplyname FROM users JOIN roles ON roles.id = users.role_id JOIN supply ON supply.id = users.supply_id where type_user=3 and supply_id=?";
            con.query(sql,id,function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}


function shopsusers(id){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql = "SELECT users.id AS id, users.full_name AS full_name,users.username AS username,users.status AS status,users.no_delete AS no_delete,roles.label AS rolesname,shop.name AS shopname FROM users JOIN roles ON roles.id = users.role_id JOIN shop ON shop.id = users.shop_id where type_user=2 and shop_id=?";
           con.query(sql,id,function (err,result){
               con.release();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}

function customersusers(){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con){
            if (err) throw err;
            var sql = "SELECT * FROM users where type_user=4";
            con.query(sql,function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}
function customersview(id) {
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con){
            con.query('select * from users where id = ?',id,
                (err, result) => {
                    con.release();
                    if (err) return reject(err);
                    return resolve(result[0]);
                });
        });

    });
}
function updatedcustomers(data,userid){
    if(data){
        return new Promise((resolve, reject) => {
            db.connectionDB().getConnection(function(err, con){
                if (err) throw err;
                var sql    = 'UPDATE users SET full_name = ?,email = ?,birthday = ?,address = ?,status=? WHERE id=?';
                con.query(sql, [data.full_name,data.email,data.birthday,data.address,data.status,userid],function (err,result) {
                    con.release();
                    if (err) return reject(err);
                    return resolve(result);
                });
            });
        });
    }
}
function seachcustomers(data){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            const params = [];
            if (err) throw err;
            let sql = 'SELECT * FROM users where type_user=4';
            if (data.s_fullname !== '') {
                sql += ' and full_name LIKE "%'+ data.s_fullname +'%"';
            }
            if (data.s_phone !== '') {
                sql += ' and phone LIKE "%'+ data.s_phone +'%"';
            }
            con.query(sql,function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}
function bysupply(supplyid){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql = "SELECT users.id AS id, users.full_name AS full_name,users.username AS username,users.status,users.no_delete AS no_delete,roles.label AS rolesname, supply.name AS supplyname FROM users JOIN roles ON roles.id = users.role_id  JOIN supply ON supply.id = users.supply_id where type_user=3 and supply_id = ?";
            con.query(sql,supplyid,function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}

function byshop(shopid){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql = "SELECT users.id AS id, users.full_name AS full_name,users.username AS username,users.status,users.no_delete AS no_delete,roles.label AS rolesname, shop.name AS shopname FROM users JOIN roles ON roles.id = users.role_id  JOIN shop ON shop.id = users.shop_id where type_user=2 and shop_id = ?";
            con.query(sql,shopid,function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}
function getshippers(){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err,con) {
            if (err) throw err;
            var sql = "SELECT users.id AS id, users.full_name AS full_name,users.phone AS phone,users.username AS username,users.status AS status,roles.label AS rolesname,branch.name AS branchname FROM users JOIN roles ON roles.id = users.role_id JOIN branch ON branch.id = users.branch_id where type_user=1 and users.role_id=5";
            con.query(sql,function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}

module.exports ={
    register:register,
    all:all,
    getUsername:getUsername,
    getUserid:getUserid,
    deleteuser:deleteuser,
    view:view,
    updated:updated,
    memberupdated:memberupdated,
    memberupdatednopass:memberupdatednopass,
    seach:seach,
    shops:shops,
    shopsview:shopsview,
    updatedshops:updatedshops,
    seachshops:seachshops,
    supplies:supplies,
    suppliesview:suppliesview,
    updatedsupplies:updatedsupplies,
    seachsupplies:seachsupplies,
    suppliesusers:suppliesusers,
    shopsusers:shopsusers,
    customersusers:customersusers,
    customersview:customersview,
    updatedcustomers:updatedcustomers,
    seachcustomers:seachcustomers,
    bysupply:bysupply,
    seachuserssupplies:seachuserssupplies,
    byshop:byshop,
    seachusersshop:seachusersshop,
    getMemberUser:getMemberUser,
    getshippers:getshippers,
}