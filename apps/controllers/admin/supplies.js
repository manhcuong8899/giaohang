const var_dump = require('var_dump');
const userDB = require('../../models/UsersDB');
const rolesDB = require('../../models/RolesDB');
const suppliesDB = require('../../models/SuppliesDB')
const discountDB = require('../../models/DiscountDB')
const sellingDB = require('../../models/SellingDB')
const helper = require('../../helpers/hepler');
const authlogin = require('../../helpers/auth');
module.exports = {
    all:  function(req, res) {
        authlogin.authstaff(req, res);
        let listsupplies;
        suppliesDB.all().then((result) => { listsupplies = result})
            .catch((err) => warning = err);
        setTimeout(() => {
            res.status(200).render('supplies/all', {
                layout: 'supplies',
                title: 'Quản lý thông tin nhà cung cấp',
                csrfToken: req.csrfToken(),
                data:{listsupplies},
                user:req.session['user'],
            });
        }, 100);
    },
    created: function(req, res){
        const request = req.body;
        const  phone = request.phone;
        const code = helper.codesupply();
        const checkphone = helper.checkPhoneNumber(phone);
        if(checkphone==false){
            res.render("supplies/all",{layout: 'supplies',csrfToken: req.csrfToken(),data:{error:"Số điện thoại không hợp lệ"}});
        }else{
            var formartphone = phone.replace('0', '+84');
        }
        var pass = helper.hash_password('12345678');
        data ={
            name: request.name,
            full_name: request.full_name,
            phone:formartphone,
            email:request.email,
            address:request.address,
            taxcode:request.taxcode,
            code:code,
        }
        suppliesDB.created(data).then((result) => {
            let sid;
            let datauser = [];
            suppliesDB.getSuppliesid(formartphone).then((suppliesid)=>{
                sid = suppliesid;
                datauser={
                    full_name: request.full_name,
                    username: formartphone,
                    phone: formartphone,
                    password: pass,
                    status:1,
                    email:request.email,
                    supply_id:sid,
                    verified:1,
                    type_user:3,
                    role_id:1,
                    no_delete:1,
                }
                userDB.register(datauser).then((kq)=>{
                    res.redirect('back');
                });
            });
        }).catch((err) => {
            res.redirect('back');
        });
    },
    delete:  function(req, res){
        var id = req.params.id;
        suppliesDB.deletesupplies(id).then((result) =>{
            res.redirect('/admin/supplies/all');
        }).catch((err) => {
            res.redirect('back');
        });
    },
    view:  function(req, res){
        var id = req.params.id;
        suppliesDB.view(id).then((result) =>{
            data =result;
            res.send(data);
        }).catch((err) => {
            res.redirect('back');
        });
    },
    updated:  function(req, res){
        const id = req.params.id;
        let data = req.body;
        suppliesDB.updated(data,id).then((result) =>{
            res.redirect('back');
        }).catch((err) => {
            res.redirect('back');
        });
    },
    seach: function(req, res){
        authlogin.authstaff(req, res);
        const data = req.body;
        let listsupplies;
        suppliesDB.seach(data).then((result) => { listsupplies = result; console.log(listshops)})
            .catch((err) => warning = err);
        setTimeout(() => {
            res.status(200).render('supplies/all',{
                layout: 'supplies',
                title: 'Quản lý thông tin nhà cung cấp',
                csrfToken: req.csrfToken(),
                data:{listsupplies},
                user:req.session['user'],
            });
        }, 100);
    },
    users:  function(req, res){
        const suppliesid = req.params.id;
        authlogin.authstaff(req, res);
        let warning; let liststaff; let listroles; let branch;
        userDB.suppliesusers(suppliesid).then((result) => { liststaff = result;})
            .catch((err) => warning = err);
        rolesDB.all().then((result) => { listroles = result;})
            .catch((err) => warning = err);
        suppliesDB.all().then((result) => { branch = result;})
            .catch((err) => warning = err);
        setTimeout(() => {
            res.status(200).render('users/supplies',{
                layout: 'users',
                title: 'Quản lý tài khoản nhà cung cấp',
                csrfToken: req.csrfToken(),
                data:{liststaff,listroles,branch},
                user:req.session['user'],
            });
        }, 100);
    },

    dashboard:  function(req, res){
        const suppliesid = req.params.id;
        authlogin.authstaff(req, res);
      let info; let countuser,discount,products;
        suppliesDB.view(suppliesid).then((result) => { info = result;})
            .catch((err) => warning = err);
        suppliesDB.countuser(suppliesid).then((count) => { countuser = count.TotalCount;})
            .catch((err) => warning = err);
        discountDB.supply(suppliesid).then((result) => { discount = result;})
            .catch((err) => warning = err);

        sellingDB.bysupply(suppliesid).then((result) => { products = result;}
        ).catch((err) => warning = err);

        setTimeout(() => {
            res.status(200).render('supplies/dashboard',{
                layout: 'supplies',
                title: 'Thông tin chi tiết đơn vị cung cấp',
                csrfToken: req.csrfToken(),
                data:{info,countuser,discount,products},
                user:req.session['user'],
            });
        }, 100);
    },
};