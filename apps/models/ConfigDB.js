const db = require('../models/connectionDB');

function all(){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql = 'SELECT * FROM config';
            con.query(sql,function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result);
            });

        });
    });
}

function updated(code,val){
        return new Promise((resolve, reject) => {
            db.connectionDB().getConnection(function(err, con) {
                if (err) throw err;
                var sql    = 'UPDATE config SET val = ? WHERE code=?';
                con.query(sql, [val,code],function (err,result) {
                   con.release();
                    if (err) return reject(err);
                    return resolve(result);
                });
            });
        });
}
//// Du lieu cau hinh don vi hang hoa
function units(){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql = 'SELECT * FROM units';
            con.query(sql,function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}
function created_unit(data){
    if(data){
        return new Promise((resolve, reject) => {
            db.connectionDB().getConnection(function(err, con) {
                if (err) throw err;
                con.query('INSERT INTO units SET ?', data,function (err,result) {
                    con.release();
                    if (err) return reject(err);
                    return resolve(result);
                });
            });
        });
    }
}
function updated_unit(data,unitid){
    if(data){
        return new Promise((resolve, reject) => {
            db.connectionDB().getConnection(function(err, con) {
                if (err) throw err;
                var sql    = 'UPDATE units SET code = ? WHERE id=?';
                con.query(sql, [data.code,unitid],function (err,result) {
                    con.release();
                    if (err) return reject(err);
                    return resolve(result);
                });
            });
        });
    }
}
function view_unit(id) {
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            con.query('select * from units where id = ?', id,
                (err, result) => {
                con.release();
                    if (err) return reject(err);
                    return resolve(result[0]);
                });
        });

    });
}
function delete_unit(id){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con){
            if (err) throw err;
            var sql = "DELETE FROM units WHERE id =?";
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

//// Du lieu cau hinh tai khoan ngan hang
function banks(){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con){
            if (err) throw err;
            var sql = 'SELECT * FROM banks where type = "AD"';
            con.query(sql,function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}
function created_bank(data){
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
function updated_bank(data,bankid){
    if(data){
        return new Promise((resolve, reject) => {
            db.connectionDB().getConnection(function(err, con) {
                if (err) throw err;
                var sql    = 'UPDATE banks SET code = ?,name = ?,number = ?, account = ?, branch = ? WHERE id=?';
                con.query(sql, [data.code,data.name,data.number,data.account,data.branch,bankid],function (err,result) {
                    con.release();
                    if (err) return reject(err);
                    return resolve(result);
                });
            });
        });
    }
}
function view_bank(id) {
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            con.query('select * from banks where id = ?', id,
                (err, result) => {
                con.release();
                    if (err) return reject(err);
                    return resolve(result[0]);
                });
        });

    });
}
function delete_bank(id){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql = "DELETE FROM banks WHERE id =?";
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
//// Du lieu cau hinh dữ liệu khu vực tỉnh/thành phố
function city(){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql = 'SELECT * FROM locale';
            con.query(sql,function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}
function created_locale(data){
    if(data){
        return new Promise((resolve, reject) => {
            db.connectionDB().getConnection(function(err, con) {
                if (err) throw err;
                con.query('INSERT INTO locale SET ?', data,function (err,result) {
                    con.release();
                    if (err) return reject(err);
                    return resolve(result);
                });
            });
        });
    }
}
function updated_locale(data,localeid){
    if(data){
        return new Promise((resolve, reject) => {
            db.connectionDB().getConnection(function(err, con) {
                if (err) throw err;
                var sql    = 'UPDATE locale SET name = ?,domain = ? WHERE code=?';
                con.query(sql, [data.name,data.domain,localeid],function (err,result) {
                    con.release();
                    if (err) console.log(err);
                    return resolve(result);
                });
            });
        });
    }
}
function view_locale(code) {
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            con.query('select * from locale where code = ?', code,
                (err, result) => {
                con.release();
                    if (err) return reject(err);
                    return resolve(result[0]);
                });
        });

    });
}
function delete_locale(code){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql = "DELETE FROM locale WHERE code =?";
            con.query(sql,code,function (err,result){
                con.release();
                if (err) return reject(err);
                if(result){
                    return resolve(result);
                }
            });
        });
    });
}
function district(code){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql = 'SELECT * FROM district where code_city =?';
            con.query(sql,code,function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}
function created_district(data){
    if(data){
        return new Promise((resolve, reject) => {
            db.connectionDB().getConnection(function(err, con) {
                if (err) throw err;
                con.query('INSERT INTO district SET ?', data,function (err,result) {
                    con.release();
                    if (err) return reject(err);
                    return resolve(result);
                });
            });
        });
    }
}
function view_district(code) {
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            con.query('select * from district where code = ?', code,
                (err, result) => {
                    con.release();
                    if (err) return reject(err);
                    return resolve(result[0]);
                });
        });

    });
}
function updated_district(data,localeid){
    if(data){
        return new Promise((resolve, reject) => {
            db.connectionDB().getConnection(function(err, con) {
                if (err) throw err;
                var sql    = 'UPDATE district SET name = ?,type = ? WHERE code=?';
                con.query(sql, [data.name,data.type,localeid],function (err,result) {
                    con.release();
                    if (err) return reject(err);
                    return resolve(result);
                });
            });
        });
    }
}
function delete_district(code){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql = "DELETE FROM district WHERE code =?";
            con.query(sql,code,function (err,result){
                con.release();
                if (err) return reject(err);
                if(result){
                    return resolve(result);
                }
            });
        });
    });
}
function getcity(code){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql = 'SELECT * FROM locale where code =?';
            con.query(sql,code,function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result[0]);
            });
        });
    });
}

function wards(code){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql = 'SELECT * FROM wards where code_district =?';
            con.query(sql,code,function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}
function created_wards(data){
    if(data){
        return new Promise((resolve, reject) => {
            db.connectionDB().getConnection(function(err, con) {
                if (err) throw err;
               con.query('INSERT INTO wards SET ?', data,function (err,result) {
                   con.release();
                    if (err) return console.log(err);
                    return resolve(result);
                });
            });
        });
    }
}
function view_wards(code) {
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            con.query('select * from wards where code = ?', code,
                (err, result) => {
                con.release();
                    if (err) return reject(err);
                    return resolve(result[0]);
                });
        });
    });
}
function updated_wards(data,localeid){
    if(data){
        return new Promise((resolve, reject) => {
            db.connectionDB().getConnection(function(err, con) {
                if (err) throw err;
                var sql    = 'UPDATE wards SET name = ?,type = ? WHERE code=?';
                con.query(sql, [data.name,data.type,localeid],function (err,result) {
                    con.release();
                    if (err) return reject(err);
                    return resolve(result);
                });
            });
        });
    }
}
function delete_wards(code){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql = "DELETE FROM wards WHERE code =?";
            con.query(sql,code,function (err,result){
                con.release();
                if (err) return reject(err);
                if(result){
                    return resolve(result);
                }
            });
        });
    });
}
function getdistrict(code){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql = 'SELECT * FROM district where code =?';
            con.query(sql,code,function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result[0]);
            });
        });
    });
}

//// Du lieu cau hinh dữ liệu thoi gian giao hang
function timedelivery(){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql = 'SELECT * FROM timedelivery';
            con.query(sql,function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}
function created_timedelivery(data){
    if(data){
        return new Promise((resolve, reject) => {
            db.connectionDB().getConnection(function(err, con) {
                if (err) throw err;
                con.query('INSERT INTO timedelivery SET ?', data,function (err,result) {
                    con.release();
                    if (err) return reject(err);
                    return resolve(result);
                });
            });
        });
    }
}
function updated_timedelivery(data,timeid){
    if(data){
        return new Promise((resolve, reject) => {
            db.connectionDB().getConnection(function(err, con) {
                if (err) throw err;
                var sql    = 'UPDATE timedelivery SET name = ?,val_from = ?,val_to = ?,type = ? WHERE id=?';
                db.connectionDB().query(sql, [data.name,data.val_from,data.val_to,data.type,timeid],function (err,result) {
                    con.release();
                    if (err) return reject(err);
                    return resolve(result);
                });
            });
        });
    }
}
function view_timedelivery(id) {
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            con.query('select * from timedelivery where id = ?', id,
                (err, result) => {
                con.release();
                    if (err) return reject(err);
                    return resolve(result[0]);
                });
        });

    });
}
function delete_timedelivery(id){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql = "DELETE FROM timedelivery WHERE id =?";
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

function branch(){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con){
            if (err) throw err;
            let sql = 'SELECT branch.id AS id, branch.name AS name,branch.address AS address,locale.name AS province FROM branch JOIN locale ON locale.code = branch.province';
           con.query(sql,function (err,result){
               con.release();
               if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}
function created_branch(data){
    if(data){
        return new Promise((resolve, reject) => {
            db.connectionDB().getConnection(function(err, con) {
                if (err) throw err;
                con.query('INSERT INTO branch SET ?', data,function (err,result) {
                    con.release();
                    if (err) return reject(err);
                    return resolve(result);
                });
            });
        });
    }
}
function view_branch(id) {
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            let sql = 'SELECT branch.id AS id, branch.name AS name,branch.phone AS phone,branch.hotline AS hotline,branch.address,branch.googlemap AS googlemap,branch.province AS province,locale.name AS nameprovince,branch.district AS district,district.name AS namedistrict,branch.wards AS wards,wards.name AS namewards  FROM branch JOIN locale ON locale.code = branch.province JOIN district ON district.code = branch.district JOIN wards ON wards.code = branch.wards where branch.id=?';
            con.query(sql, id, (err, result) => {
                con.release();
                if (err) return reject(err);
                return  resolve((result[0]));
            });
        });

    });
}
function updated_branch(data,branchid){
    if(data){
        return new Promise((resolve, reject) => {
            db.connectionDB().getConnection(function(err, con) {
                if (err) throw err;
                var sql    = 'UPDATE branch SET name = ?, province = ?, district = ?, wards = ?, address = ?, phone = ?, hotline = ?, googlemap = ? WHERE id = ?';
                con.query(sql, [data.name, data.province, data.district, data.wards, data.address, data.phone, data.hotline, data.googlemap, branchid],function (err,result) {
                    con.release();
                    if (err) return reject(err);
                    return resolve(result);
                });
            });
        });
    }
}
function delete_branch(id){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql = "DELETE FROM branch WHERE id =?";
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

function compares(province,addressshop){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql = "SELECT * FROM locale where code =?;SELECT * FROM locale where code =?;";
            con.query(sql,[province,addressshop],function (err,result){
                con.release();
                if (err) return console.log(err);
                return resolve(result);
            });
        });
    });
}

module.exports ={
    updated:updated,
    all:all,
    created_unit:created_unit,
    updated_unit:updated_unit,
    units:units,
    view_unit:view_unit,
    delete_unit:delete_unit,
    banks:banks,
    created_bank:created_bank,
    updated_bank:updated_bank,
    view_bank:view_bank,
    delete_bank:delete_bank,
    city:city,
    created_locale:created_locale,
    updated_locale:updated_locale,
    view_locale:view_locale,
    delete_locale:delete_locale,
    district:district,
    created_district:created_district,
    view_district:view_district,
    delete_district:delete_district,
    updated_district:updated_district,
    getcity:getcity,
    wards:wards,
    created_wards:created_wards,
    view_wards:view_wards,
    delete_wards:delete_wards,
    updated_wards:updated_wards,
    getdistrict:getdistrict,
    timedelivery:timedelivery,
    created_timedelivery:created_timedelivery,
    updated_timedelivery:updated_timedelivery,
    view_timedelivery:view_timedelivery,
    delete_timedelivery:delete_timedelivery,
    branch:branch,
    created_branch:created_branch,
    view_branch:view_branch,
    delete_branch:delete_branch,
    updated_branch:updated_branch,
    compares:compares,
}