const db = require('../models/connectionDB');
//// Du lieu cau hinh địa chỉ lấy hàng
function address_shop(shopid){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            let sql = 'SELECT address.id AS id, address.name AS name,address.phone AS phone,address.address,address.googlemap AS googlemap,address.province AS province,address.setdefault AS setdefault,locale.name AS nameprovince,address.district AS district,district.name AS namedistrict,address.wards AS wards,wards.name AS namewards  FROM address JOIN locale ON locale.code = address.province JOIN district ON district.code = address.district JOIN wards ON wards.code = address.wards where address.shop_id=?';
            con.query(sql,shopid,function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}
function created_address(data){
    if(data){
        return new Promise((resolve, reject) => {
            db.connectionDB().getConnection(function(err, con) {
                if (err) throw err;
                con.query('INSERT INTO address SET ?', data,function (err,result) {
                    con.release();
                    if (err) return reject(err);
                    return resolve(result);
                });
            });
        });
    }
}
function view_address(id,shopid) {
    return new Promise((resolve, reject) => {

        db.connectionDB().getConnection(function(err, con) {
            let sql = 'SELECT address.id AS id, address.name AS name,address.phone AS phone,address.address,address.googlemap AS googlemap,address.province AS province,locale.name AS nameprovince,address.district AS district,district.name AS namedistrict,address.wards AS wards,wards.name AS namewards  FROM address JOIN locale ON locale.code = address.province JOIN district ON district.code = address.district JOIN wards ON wards.code = address.wards where address.province=? and address.shop_id=?';
            con.query(sql, [id,shopid], (err, result) => {
                con.release();
                if (err) return reject(err);
                return  resolve((result[0]));
            });
        });

    });
}
function updated_address(data,addressid,shopid){
    if(data){
        return new Promise((resolve, reject) => {
            db.connectionDB().getConnection(function(err, con){
                if (err) throw err;
                var sql    = 'UPDATE address SET name = ?, province = ?, district = ?, wards = ?, address = ?, phone = ?, googlemap = ? WHERE id = ? and shop_id=?';
                con.query(sql, [data.name, data.province, data.district, data.wards, data.address, data.phone, data.googlemap, addressid,shopid],function (err,result) {
                    con.release();
                    if (err) return reject(err);
                    return resolve(result);
                });
            });
        });
    }
}
function delete_address(id,shopid){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql = "DELETE FROM address WHERE id =? and shop_id=?";
           con.query(sql,[id,shopid],function (err,result){
               con.release();
                if (err) return reject(err);
                if(result){
                    return resolve(result);
                }
            });
        });
    });
}

function defaultempty_shop(addressid,shopid){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con) {
            if (err) throw err;
            var sql    = 'UPDATE address SET setdefault = ? WHERE id != ? and shop_id = ?';
            con.query(sql, [0,addressid,shopid],function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}

function setdefault_shop(addressid,shopid){
    return new Promise((resolve, reject) => {
        db.connectionDB().getConnection(function(err, con)  {
            if (err) throw err;
            var sql    = 'UPDATE address SET setdefault = ? WHERE id=? and shop_id = ?';
            con.query(sql, [1,addressid,shopid],function (err,result){
                con.release();
                if (err) return reject(err);
                return resolve(result);
            });
        });
    });
}
module.exports ={
    address_shop:address_shop,
    created_address:created_address,
    updated_address:updated_address,
    view_address:view_address,
    delete_address:delete_address,
    defaultempty_shop:defaultempty_shop,
    setdefault_shop:setdefault_shop,

}