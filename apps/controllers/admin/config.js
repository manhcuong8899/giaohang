const var_dump = require('var_dump');
const userDB = require('../../models/UsersDB');
const configDB = require('../../models/ConfigDB');
const helpers = require('../../helpers/hepler');
const authlogin = require('../../helpers/auth');
module.exports = {
    /// Du lieu don vi hang hoa
    unit:  function(req, res) {
        authlogin.authstaff(req, res);
        let units;
        configDB.units().then((result) => { units = result})
            .catch((err) => warning = err);
        setTimeout(() => {
            res.status(200).render('config/unit', {
                layout: 'config',
                title: 'Quản lý cấu hình đơn vị hàng hóa',
                csrfToken: req.csrfToken(),
                data:{units},
                user:req.session['user'],
            });
        }, 100);
    },
    post_unit: function(req, res){
        const request = req.body;
        data ={
            code: request.code,
        }
        configDB.created_unit(data).then((result) => {
            res.redirect('back');
        }).catch((err) => {
            res.redirect('back');
        });
    },
    updated_unit:  function(req, res){
        const id = req.params.id;
        let data = req.body;
        configDB.updated_unit(data,id).then((result) =>{
            res.redirect('back');
        }).catch((err) => {
            res.redirect('back');
        });
    },
    delete_unit:  function(req, res){
        var unitid = req.params.id;
        configDB.delete_unit(unitid).then((result) =>{
            res.redirect('/admin/config/unit');
        }).catch((err) => {
            res.redirect('back');
        });
    },
    view_unit:  function(req, res){
        var id = req.params.id;
        configDB.view_unit(id).then((result) =>{
            data =result;
            res.send(data);
        }).catch((err) => {
            res.redirect('back');
        });
    },

    /// Du lieu cau hinh Bank
    banks:  function(req, res) {
        authlogin.authstaff(req, res);
        let banks;
        configDB.banks().then((result) => { banks = result})
            .catch((err) => warning = err);
        setTimeout(() => {
            res.status(200).render('config/banks', {
                layout: 'config',
                title: 'Quản lý cấu hình tài khoản ngân hàng',
                csrfToken: req.csrfToken(),
                data:{banks},
                user:req.session['user'],
            });
        }, 100);
    },
    post_bank: function(req, res){
        const request = req.body;
        data ={
            name: request.name,
            code: request.code,
            number: request.number,
            account: request.account,
            branch: request.branch,
            status: 1,
            type: "AD",
        }
        configDB.created_bank(data).then((result) => {
            res.redirect('back');
        }).catch((err) => {
            res.redirect('back');
        });
    },
    updated_bank:  function(req, res){
        const id = req.params.id;
        let data = req.body;
        configDB.updated_bank(data,id).then((result) =>{
            res.redirect('back');
        }).catch((err) => {
            res.redirect('back');
        });
    },
    delete_bank:  function(req, res){
        var bankid = req.params.id;
        configDB.delete_bank(bankid).then((result) =>{
            res.redirect('/admin/config/banks');
        }).catch((err) => {
            res.redirect('back');
        });
    },
    view_bank:  function(req, res){
        var id = req.params.id;
        configDB.view_bank(id).then((result) =>{
            data =result;
            res.send(data);
        }).catch((err) => {
            res.redirect('back');
        });
    },


    /// Du lieu cau hinh vung mien, khu vuc
    city:  function(req, res) {
        authlogin.authstaff(req, res);
        let city;
        configDB.city().then((result) => { city = result})
            .catch((err) => warning = err);
        setTimeout(() => {
            res.status(200).render('config/locale', {
                layout: 'config',
                title: 'Quản lý tỉnh/thành phố',
                csrfToken: req.csrfToken(),
                data:{city},
                user:req.session['user'],
            });
        }, 100);
    },
    post_city: function(req, res){
        const request = req.body;
        data ={
            code: request.code,
            name: request.name,
            domain: request.domain,
            type: "Tỉnh",
        }
        configDB.created_locale(data).then((result) => {
            res.redirect('back');
        }).catch((err) => {
            res.redirect('back');
        });
    },
    updated_locale:  function(req, res){
        const id = req.params.id;
        let data = req.body;
        configDB.updated_locale(data,id).then((result) =>{
            res.redirect('back');
        }).catch((err) => {
            res.redirect('back');
        });
    },
    delete_locale:  function(req, res){
        var localeid = req.params.id;
        configDB.delete_locale(localeid).then((result) =>{
            res.redirect('back');
        }).catch((err) => {
            res.redirect('back');
        });
    },
    view_locale:  function(req, res){
        var id = req.params.id;
        configDB.view_locale(id).then((result) =>{
            data =result;
            res.send(data);
        }).catch((err) => {
            res.redirect('back');
        });
    },
    district:  function(req, res) {
        authlogin.authstaff(req, res);
        var code = req.params.code;
        let district,city;
        configDB.district(code).then((result) => { district = result})
            .catch((err) => warning = err);
        configDB.getcity(code).then((kq) => { city = kq;})
            .catch((err) => warning = err);
        setTimeout(() => {
            res.status(200).render('config/district', {
                layout: 'config',
                title: 'Quản lý Quận, Huyện',
                csrfToken: req.csrfToken(),
                data:{district,city}
            });
        }, 100);
    },
    post_district: function(req, res){
        var codecity = req.params.code;
        const request = req.body;
        data ={
            code: request.code,
            name: request.name,
            type: request.type,
            code_city: codecity,
        }
        configDB.created_district(data).then((result) => {
            res.redirect('back');
        }).catch((err) => {
            res.redirect('back');
        });
    },
    updated_district:  function(req, res){
        const id = req.params.id;
        let data = req.body;
        configDB.updated_district(data,id).then((result) =>{
            res.redirect('back');
        }).catch((err) => {
            res.redirect('back');
        });
    },
    delete_district:  function(req, res){
        var localeid = req.params.id;
        configDB.delete_district(localeid).then((result) =>{
            res.redirect('back');
        }).catch((err) => {
            res.redirect('back');
        });
    },
    view_district:  function(req, res){
        var id = req.params.id;
        configDB.view_district(id).then((result) =>{
            data =result;
            res.send(data);
        }).catch((err) => {
            res.redirect('back');
        });
    },

    wards:  function(req, res) {
        authlogin.authstaff(req, res);
        var code = req.params.code;
        let wards, district;
        configDB.wards(code).then((result) => { wards = result})
            .catch((err) => warning = err);
        configDB.getdistrict(code).then((kq) => { district = kq;})
            .catch((err) => warning = err);
        setTimeout(() => {
            res.status(200).render('config/wards',{
                layout: 'config',
                title: 'Quản lý Phường/Xã',
                csrfToken: req.csrfToken(),
                data:{wards,district}
            });
        }, 100);
    },
    post_wards: function(req, res){
        var codedistrict = req.params.code;
        const request = req.body;
        data ={
            code: request.code,
            name: request.name,
            type: request.type,
            code_district: codedistrict,
        }
        configDB.created_wards(data).then((result) => {
            res.redirect('back');
        }).catch((err) => {
            res.redirect('back');
        });
    },
    updated_wards:  function(req, res){
        const id = req.params.id;
        let data = req.body;
        configDB.updated_wards(data,id).then((result) =>{
            res.redirect('back');
        }).catch((err) => {
            res.redirect('back');
        });
    },
    delete_wards:  function(req, res){
        var localeid = req.params.id;
        configDB.delete_wards(localeid).then((result) =>{
            res.redirect('back');
        }).catch((err) => {
            res.redirect('back');
        });
    },
    view_wards:  function(req, res){
        var id = req.params.id;
        configDB.view_wards(id).then((result) =>{
            data =result;
            res.send(data);
        }).catch((err) => {
            res.redirect('back');
        });
    },

    /// Du lieu cau hinh chi phi
    cost:  function(req, res) {
        authlogin.authstaff(req, res);
        let listcofig;
        let cost = new Array();
        configDB.all().then((result) => { listcofig = result;
            Object.keys(listcofig).forEach(function(key){
                cost[listcofig[key].code] = listcofig[key].val;
            });
        }).catch((err) => warning = err);

        setTimeout(() => {
            res.status(200).render('config/cost',{
                layout: 'config',
                title: 'Cấu hình chi phí',
                csrfToken: req.csrfToken(),
                data:{cost}
            });
        }, 100);
    },
    update_cost:  function(req, res) {
        const data = req.body;
        var obj = JSON.parse(JSON.stringify(data))
        Object.keys(obj).forEach(function(code){
            if(code!='_csrf'){
                var val = obj[code];
                configDB.updated(code,val).then((result) =>{
                    res.redirect('back');
                }).catch((err) => {
                    res.redirect('back');
                });
            }
        });
        setTimeout(() => {
            res.status(200).render('config/cost', {
                layout: 'config',
                title: 'Cấu hình các quy định chi phí chung',
                csrfToken: req.csrfToken(),
                data:{}
            });
        }, 100);
    },

    /// Du lieu cau hinh thoi gian giao hang
    timedelivery:  function(req, res) {
        authlogin.authstaff(req, res);
        let timedelivery;
        configDB.timedelivery().then((result) => { timedelivery = result})
            .catch((err) => warning = err);
        setTimeout(() => {
            res.status(200).render('config/timedelivery', {
                layout: 'config',
                title: 'Quản lý thời gian giao hàng',
                csrfToken: req.csrfToken(),
                data:{timedelivery},
                user:req.session['user'],
            });
        }, 100);
    },
    post_timedelivery: function(req, res){
        const request = req.body;
        data ={
            name: request.name,
            val_from: request.val_from,
            val_to:request.val_to,
            type: request.type,
        }
        configDB.created_timedelivery(data).then((result) => {
            res.redirect('back');
        }).catch((err) => {
            res.redirect('back');
        });
    },
    updated_timedelivery:  function(req, res){
        const id = req.params.id;
        let data = req.body;
        configDB.updated_timedelivery(data,id).then((result) =>{
            res.redirect('back');
        }).catch((err) => {
            res.redirect('back');
        });
    },
    delete_timedelivery:  function(req, res){
        var timeid = req.params.id;
        configDB.delete_timedelivery(timeid).then((result) =>{
            res.redirect('back');
        }).catch((err) => {
            res.redirect('back');
        });
    },
    view_timedelivery:  function(req, res){
        var id = req.params.id;
        configDB.view_timedelivery(id).then((result) =>{
            data =result;
            res.send(data);
        }).catch((err) => {
            res.redirect('back');
        });
    },
    /// Du lieu Tram van chuyen
    branch:  function(req, res) {
        authlogin.authstaff(req, res);
        let listbranch,province;
        configDB.branch().then((result) => { listbranch = result})
            .catch((err) => warning = err);
        configDB.city().then((result) => { province = result})
            .catch((err) => warning = err);
        setTimeout(() => {
            res.status(200).render('config/branch', {
                layout: 'config',
                title: 'Quản lý trạm vận chuyển',
                csrfToken: req.csrfToken(),
                data:{listbranch,province}
            });
        }, 100);
    },
    post_branch: function(req, res){
        const request = req.body;
        data ={
            name: request.name,
            province: request.province,
            district: request.district,
            wards: request.wards,
            address: request.address,
            phone: request.phone,
            hotline: request.hotline,
            googlemap: request.googlemap,
        }
        configDB.created_branch(data).then((result) => {
            res.redirect('back');
        }).catch((err) => {
            res.redirect('back');
        });
    },
    updated_branch:  function(req, res){
        const id = req.params.id;
        let data = req.body;
        configDB.updated_branch(data,id).then((result) =>{
            res.redirect('back');
        }).catch((err) => {
            res.redirect('back');
        });
    },
    delete_branch:  function(req, res){
        var localeid = req.params.id;
        configDB.delete_branch(localeid).then((result) =>{
            res.redirect('back');
        }).catch((err) => {
            res.redirect('back');
        });
    },
    view_branch:  function(req, res){
        var id = req.params.id;
        configDB.view_branch(id).then((result) =>{
            data =result;
            res.send(data);
        }).catch((err) => {
            res.redirect('back');
        });
    },
    ajax_province:  function(req, res){
        data = req.body;
        configDB.district(data.province).then((result) =>{
            data =result;
            res.send(data);
        }).catch((err) => {
            res.redirect('back');
        });
    },
    ajax_district:  function(req, res){
        data = req.body;
        configDB.wards(data.district).then((result) =>{
            data =result;
            res.send(data);
        }).catch((err) => {
            res.redirect('back');
        });
    },

};