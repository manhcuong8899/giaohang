const var_dump = require('var_dump');
const userDB = require('../../models/UsersDB');
const suppliesDB = require('../../models/SuppliesDB')
const rolesDB = require('../../models/RolesDB')
const banksDB = require('../../models/BankDB')
const helpers = require('../../helpers/hepler');
const authlogin = require('../../helpers/auth');
module.exports = {
    information: function(req, res) {
        authlogin.authsupply(req, res);
        let supply;
        suppliesDB.view(req.session['user'].supply_id).then((result) => { supply = result;})
            .catch((err) => warning = err);
        setTimeout(() => {
            res.status(200).render('supply/settings/information', {
                layout: 'supply/settings',
                title: 'Cấu hình thông tin nhà cung cấp',
                csrfToken: req.csrfToken(),
                data:{supply},
                user:req.session['user'],
            });
        }, 100);
    },
    updated_information: function(req, res){
        const code = req.params.code;
        authlogin.authsupply(req, res);
        let aSupply;
        suppliesDB.bycode(code).then((kq)=>{aSupply = kq;
            let path = 'public/upload/supply/logo/';
            let uploadFile = helpers.uploadimages_setnamecode(path,'images',code);
            uploadFile(req, res, (error) => {
                if (error) {
                    return res.send(`Error when trying to upload: ${error}`);
                }
                const request = req.body;
                if(!req.file){
                    data ={
                        name: request.name,
                        full_name:request.full_name,
                        images:aSupply.images,
                        phone:request.phone,
                        email:request.email,
                        address: request.address,
                        taxcode: request.taxcode,
                    }
                    suppliesDB.updated_full(data,aSupply.id).then((result) =>{
                        res.redirect('back');
                    }).catch((err) => {
                        res.redirect('back');
                    });
                }else{
                    let nameimages = helpers.getnameimages(code,req.file.mimetype);
                    data ={
                        name: request.name,
                        full_name:request.full_name,
                        images:nameimages,
                        phone:request.phone,
                        email:request.email,
                        address: request.address,
                        taxcode: request.taxcode,
                    }
                    suppliesDB.updated_full(data,aSupply.id).then((result) =>{
                        res.redirect('back');
                    }).catch((err) => {
                        res.redirect('back');
                    });
                };
            });


        }).catch((err) => {
            console.log(err);
        });
    },
    users:  function(req, res) {
        authlogin.authsupply(req, res);
        let listusers, listroles;
        userDB.bysupply(req.session['user'].supply_id).then((result) => { listusers = result;})
            .catch((err) => warning = err);
        rolesDB.all().then((result) => { listroles = result;})
            .catch((err) => warning = err);
        setTimeout(() => {
            res.status(200).render('supply/settings/users', {
                layout: 'supply/settings',
                title: 'Quản lý tài khoản nhân sự',
                csrfToken: req.csrfToken(),
                data:{listusers,listroles},
                user:req.session['user'],
                supplyid:req.session['user'].supply_id,
            });
        }, 100);
    },
    created_users:  function(req, res){
        authlogin.authsupply(req, res);
        const staff = req.body;
        const  full_name = staff.full_name;
        const  phone = staff.phone;
        const  email = staff.email;
        const  roles = staff.roles;
        const  birthday = staff.birthday;
        const  address = staff.address;
        const checkphone = helpers.checkPhoneNumber(phone);
        if(checkphone==false){
            res.render("users/staff",{layout: 'users',csrfToken: req.csrfToken(),data:{error:"Số điện thoại không hợp lệ"}});
        }else{
            var formartphone = phone.replace('0', '+84');
        }
        var pass = helpers.hash_password('12345678');
        data ={
            username: formartphone,
            full_name: full_name,
            email:email,
            password:pass,
            phone:formartphone,
            birthday:birthday,
            address:address,
            type_user:'3',
            verified:'1',
            role_id:roles,
            supply_id:req.session['user'].supply_id,
        }
        userDB.register(data).then((result) => {
            res.redirect('back');
        }).catch((err) => {
            res.redirect('back');
        });
    },
    view_users:  function(req, res){
        authlogin.authsupply(req, res);
        var userid = req.params.id;
        userDB.suppliesview(userid).then((result) =>{
            data =result;
            res.send(data);
        }).catch((err) => {
            res.redirect('back');
        });
    },
    updated_users:  function(req, res){
        authlogin.authsupply(req, res);
        const userid = req.params.id;
        let data = req.body;
        userDB.updatedsupplies(data,userid).then((result) =>{
            res.redirect('/supply/settings/users');
        }).catch((err) => {
            res.redirect('/supply/settings/users');
        });
    },
    delete_users:  function(req, res){
        authlogin.authsupply(req, res);
        var userid = req.params.id;
        userDB.deleteuser(userid).then((result) =>{
            res.redirect('back');
        }).catch((err) => {
            res.redirect('back');
        });
    },
    seach_users: function(req, res){
        authlogin.authsupply(req, res);
        var supplyid = req.params.supplyid;
        const data = req.body;
        let listusers; let listroles;
        userDB.seachuserssupplies(data,supplyid).then((result) => { listusers = result;})
            .catch((err) => warning = err);
        rolesDB.all().then((result) => { listroles = result;})
            .catch((err) => warning = err);
        setTimeout(() => {
            res.status(200).render('supply/settings/users',{
                layout: 'supply/settings',
                title: 'Quản lý tài khoản nhân sự',
                csrfToken: req.csrfToken(),
                data:{listusers,listroles},
                user:req.session['user'],
                supplyid:req.session['user'].supply_id,
            });
        }, 100);
    },
    /// Du lieu cau hinh Bank

    banks:  function(req, res) {
        authlogin.authsupply(req, res);
        let banks;
        let supplyid = req.session['user'].supply_id;
        banksDB.banks_supply(supplyid).then((result) => { banks = result})
            .catch((err) => warning = err);
        setTimeout(() => {
            res.status(200).render('supply/settings/banks', {
                layout: 'supply/settings',
                title: 'Quản lý cấu hình tài khoản ngân hàng',
                csrfToken: req.csrfToken(),
                data:{banks},
                user:req.session['user'],
                supplyid:req.session['user'].supply_id,
            });
        }, 100);
    },
    created_bank: function(req, res){
        const request = req.body;
        data ={
            name: request.name,
            code: request.code,
            number: request.number,
            account: request.account,
            branch: request.branch,
            status: 1,
            type: "SL",
            supply_id:req.session['user'].supply_id,
        }
        banksDB.created(data).then((result) => {
            res.redirect('back');
        }).catch((err) => {
            res.redirect('back');
        });
    },
    updated_bank:  function(req, res){
        const id = req.params.id;
        let data = req.body;
        banksDB.updated_supply(data,id,req.session['user'].supply_id).then((result) =>{
            res.redirect('back');
        }).catch((err) => {
            res.redirect('back');
        });
    },
    delete_bank:  function(req, res){
        var bankid = req.params.id;
        banksDB.delete_supply(bankid,req.session['user'].supply_id).then((result) =>{
            res.redirect('back');
        }).catch((err) => {
            res.redirect('back');
        });
    },
    view_bank:  function(req, res){
        var id = req.params.id;
        banksDB.view_supply(id,req.session['user'].supply_id).then((result) =>{
            data =result;
            res.send(data);
        }).catch((err) => {
            res.redirect('back');
        });
    },
    default_bank:  function(req, res){
        var bankid = req.params.id;
        banksDB.defaultempty_supply(bankid,req.session['user'].supply_id).then((result) =>{
            banksDB.setdefault_supply(bankid,req.session['user'].supply_id).then((result) =>{
                res.redirect('back');
            }).catch((err) => {
                res.redirect('back');
            });
        }).catch((err) => {
            res.redirect('back');
        });
    },
};