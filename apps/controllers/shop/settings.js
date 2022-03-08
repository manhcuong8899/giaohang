const var_dump = require('var_dump');
const userDB = require('../../models/UsersDB');
const shopDB = require('../../models/ShopDB')
const rolesDB = require('../../models/RolesDB')
const banksDB = require('../../models/BankDB')
const addressDB = require('../../models/AddressDB')
const configDB = require('../../models/ConfigDB')
const helpers = require('../../helpers/hepler');
const authlogin = require('../../helpers/auth');
module.exports = {
    information: function(req, res) {
        authlogin.authshop(req, res);
        let shop;
        shopDB.view(req.session['user'].shop_id).then((result) => { shop = result;})
            .catch((err) => warning = err);
        setTimeout(() => {
            res.status(200).render('shop/settings/information', {
                layout: 'shop/settings',
                title: 'Cấu hình thông tin Shop/cửa hàng',
                csrfToken: req.csrfToken(),
                data:{shop},
                user:req.session['user'],
            });
        }, 100);
    },
    updated_information: function(req, res){
        const code = req.params.code;
        authlogin.authshop(req, res);
        let aShop;
        shopDB.bycode(code).then((kq)=>{aShop = kq;
            let path = 'public/upload/shop/logo/';
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
                        images:aShop.images,
                        phone:request.phone,
                        email:request.email,
                        address: request.address,
                        taxcode: request.taxcode,
                        status: request.status,
                    }
                    shopDB.updated_full(data,aShop.id).then((result) =>{
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
                        status: request.status,
                    }
                    shopDB.updated_full(data,aShop.id).then((result) =>{
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
        authlogin.authshop(req, res);
        let listusers, listroles;
        userDB.byshop(req.session['user'].shop_id).then((result) => { listusers = result;})
            .catch((err) => warning = err);
        rolesDB.all().then((result) => { listroles = result;})
            .catch((err) => warning = err);
        setTimeout(() => {
            res.status(200).render('shop/settings/users', {
                layout: 'shop/settings',
                title: 'Quản lý tài khoản nhân sự',
                csrfToken: req.csrfToken(),
                data:{listusers,listroles},
                user:req.session['user'],
                shopid:req.session['user'].shop_id,
            });
        }, 100);
    },
    created_users: async function(req, res){
        authlogin.authshop(req, res);
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
            type_user:'2',
            verified:'1',
            role_id:roles,
            shop_id:req.session['user'].shop_id,
        }
        await userDB.register(data).then((result) => {
            res.redirect('back');
        }).catch((err) => {
            res.redirect('back');
        });
    },
    view_users:  function(req, res){
        authlogin.authshop(req, res);
        var userid = req.params.id;
        userDB.shopsview(userid).then((result) =>{
            data =result;
            res.send(data);
        }).catch((err) => {
            res.redirect('back');
        });
    },
    updated_users:  async function(req, res){
        authlogin.authshop(req, res);
        const userid = req.params.id;
        let data = req.body;
       await userDB.updatedshops(data,userid).then((result) =>{
            res.redirect('/shop/settings/users');
        }).catch((err) => {
            res.redirect('/shop/settings/users');
        });
    },
    delete_users:  async function(req, res){
        authlogin.authshop(req, res);
        var userid = req.params.id;
        await userDB.deleteuser(userid).then((result) =>{
            res.redirect('back');
        }).catch((err) => {
            res.redirect('back');
        });
    },
    seach_users: function(req, res){
        authlogin.authshop(req, res);
        var shopid = req.params.shopid;
        const data = req.body;
        let listusers; let listroles;
        userDB.seachusersshop(data,shopid).then((result) => { listusers = result;})
            .catch((err) => warning = err);
        rolesDB.all().then((result) => { listroles = result;})
            .catch((err) => warning = err);
        setTimeout(() => {
            res.status(200).render('shop/settings/users',{
                layout: 'shop/settings',
                title: 'Quản lý tài khoản nhân sự',
                csrfToken: req.csrfToken(),
                data:{listusers,listroles},
                user:req.session['user'],
                shopid:req.session['user'].shop_id,
            });
        }, 100);
    },
    /// Du lieu cau hinh Bank

    banks:  function(req, res) {
        authlogin.authshop(req, res);
        let banks;
        let shopid = req.session['user'].shop_id;
        banksDB.banks_shop(shopid).then((result) => { banks = result})
            .catch((err) => warning = err);
        setTimeout(() => {
            res.status(200).render('shop/settings/banks', {
                layout: 'shop/settings',
                title: 'Quản lý cấu hình tài khoản ngân hàng',
                csrfToken: req.csrfToken(),
                data:{banks},
                user:req.session['user'],
                shopid:req.session['user'].shop_id,
            });
        }, 100);
    },
    created_bank: async function(req, res){
        const request = req.body;
        data ={
            name: request.name,
            code: request.code,
            number: request.number,
            account: request.account,
            branch: request.branch,
            status: 1,
            type: "SH",
            shop_id:req.session['user'].shop_id,
        }
        await banksDB.created(data).then((result) => {
            res.redirect('back');
        }).catch((err) => {
            res.redirect('back');
        });
    },
    updated_bank: async function(req, res){
        authlogin.authshop(req, res);
        const id = req.params.id;
        let data = req.body;
        await banksDB.updated_shop(data,id,req.session['user'].shop_id).then((result) =>{
            res.redirect('back');
        }).catch((err) => {
            res.redirect('back');
        });
    },
    delete_bank:  async function(req, res){
        authlogin.authshop(req, res);
        var bankid = req.params.id;
        await banksDB.delete_shop(bankid,req.session['user'].shop_id).then((result) =>{
            res.redirect('back');
        }).catch((err) => {
            res.redirect('back');
        });
    },
    view_bank:  function(req, res){
        var id = req.params.id;
        banksDB.view_shop(id,req.session['user'].shop_id).then((result) =>{
            data =result;
            res.send(data);
        }).catch((err) => {
            res.redirect('back');
        });
    },
    default_bank:  function(req, res){
        var bankid = req.params.id;
        banksDB.defaultempty_shop(bankid,req.session['user'].shop_id).then((result) =>{
            banksDB.setdefault_shop(bankid,req.session['user'].shop_id).then((result) =>{
                res.redirect('back');
            }).catch((err) => {
                res.redirect('back');
            });
        }).catch((err) => {
            res.redirect('back');
        });
    },
    /// Du lieu cau hinh Địa chỉ
    address:  function(req, res) {
        authlogin.authshop(req, res);
        let listaddress,province;
        addressDB.address_shop(req.session['user'].shop_id).then((result) => { listaddress = result})
            .catch((err) => warning = err);
        configDB.city().then((result) => { province = result})
            .catch((err) => warning = err);
        setTimeout(() => {
            res.status(200).render('shop/settings/address', {
                layout: 'shop/settings',
                title: 'Quản lý địa chỉ nhận hàng',
                csrfToken: req.csrfToken(),
                data:{listaddress,province},
                user:req.session['user'],
            });
        }, 100);
    },
    created_address: function(req, res){
        const request = req.body;
        data ={
            name: request.name,
            province: request.province,
            district: request.district,
            wards: request.wards,
            address: request.address,
            phone: request.phone,
            googlemap: request.googlemap,
            shop_id:req.session['user'].shop_id,
        }
        addressDB.created_address(data).then((result) => {
            res.redirect('back');
        }).catch((err) => {
            res.redirect('back');
        });
    },
    updated_address:  function(req, res){
        const id = req.params.id;
        let data = req.body;
        addressDB.updated_address(data,id,req.session['user'].shop_id).then((result) =>{
            res.redirect('back');
        }).catch((err) => {
            res.redirect('back');
        });
    },
    delete_address:  function(req, res){
        var addressid = req.params.id;
        addressDB.delete_address(addressid,req.session['user'].shop_id).then((result) =>{
            res.redirect('back');
        }).catch((err) => {
            res.redirect('back');
        });
    },
    view_address:  function(req, res){
        var id = req.params.id;
        addressDB.view_address(id,req.session['user'].shop_id).then((result) =>{
            data =result;
            res.send(data);
        }).catch((err) => {
            res.redirect('back');
        });
    },
    default_address:  function(req, res){
        var addressid = req.params.id;
        addressDB.defaultempty_shop(addressid,req.session['user'].shop_id).then((result) =>{
            addressDB.setdefault_shop(addressid,req.session['user'].shop_id).then((result) =>{
                res.redirect('back');
            }).catch((err) => {
                res.redirect('back');
            });
        }).catch((err) => {
            res.redirect('back');
        });
    },


};