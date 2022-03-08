const var_dump = require('var_dump');
const userDB = require('../../models/UsersDB');
const rolesDB = require('../../models/RolesDB');
const branchDB = require('../../models/BranchDB');
const shopDB = require('../../models/ShopDB');
const supplyDB = require('../../models/SuppliesDB');
const helper = require('../../helpers/hepler');
const authlogin = require('../../helpers/auth');
const crypto = require('../../helpers/crypto');
module.exports = {
    staff:  function(req, res){
        authlogin.authstaff(req, res);
        let warning; let liststaff; let listroles; let branch;
        userDB.all().then((result) => { liststaff = result;})
                    .catch((err) => warning = err);
        rolesDB.all().then((result) => { listroles = result;})
            .catch((err) => warning = err);
        branchDB.all().then((result) => { branch = result;})
            .catch((err) => warning = err);
        setTimeout(() => {
            res.status(200).render('users/staff',{
                layout: 'users',
                title: 'Quản lý tài khoản nhân sự',
                csrfToken: req.csrfToken(),
                data:{liststaff,listroles,branch},
                user:req.session['user'],
            });
        }, 100);
    },
    staff_created:  function(req, res){
        const staff = req.body;
        const  full_name = staff.full_name;
        const  phone = staff.phone;
        const  email = staff.email;
        const  roles = staff.roles;
        const  birthday = staff.birthday;
        const  address = staff.address;
        const  branch_id = staff.branch_id;
        const checkphone = helper.checkPhoneNumber(phone);
      if(checkphone==false){
          res.render("users/staff",{layout: 'users',csrfToken: req.csrfToken(),data:{error:"Số điện thoại không hợp lệ"}});
      }else{
      var formartphone = phone.replace('0', '+84');
      }
        var pass = helper.hash_password('12345678');

        data ={
            username: formartphone,
            full_name: full_name,
            email:email,
            password:pass,
            phone:formartphone,
            birthday:birthday,
            address:address,
            type_user:'1',
            verified:'1',
            role_id:roles,
            branch_id:branch_id,
        }
        userDB.register(data).then((result) => {
                   res.redirect('back');
        }).catch((err) => {
            res.redirect('back');
        });
    },
    delete:  function(req, res){
        var userid = req.params.id;
        userDB.deleteuser(userid).then((result) =>{
            res.redirect('back');
        }).catch((err) => {
            res.redirect('back');
        });
    },
    view:  function(req, res){
        var userid = req.params.id;
        userDB.view(userid).then((result) =>{
            data =result;
            res.send(data);
        }).catch((err) => {
            res.redirect('back');
        });
    },
    updated:  function(req, res){
        const userid = req.params.id;
        let data = req.body;
        userDB.updated(data,userid).then((result) =>{
            res.redirect('back');
        }).catch((err) => {
            res.redirect('back');
        });
    },
    seach: function(req, res){
        authlogin.authstaff(req, res);
        const data = req.body;
        let warning; let liststaff; let listroles; let branch;
        userDB.seach(data).then((result) => { liststaff = result; console.log(liststaff)})
            .catch((err) => warning = err);
        rolesDB.all().then((result) => { listroles = result;})
            .catch((err) => warning = err);
        branchDB.all().then((result) => { branch = result;})
            .catch((err) => warning = err);
        setTimeout(() => {
            res.status(200).render('users/staff', {
                layout: 'users',
                title: 'Quản lý tài khoản nhân sự',
                csrfToken: req.csrfToken(),
                data:{liststaff,listroles,branch},
                user:req.session['user'],
            });
        }, 100);
    },
    shops:  function(req, res){
        authlogin.authstaff(req, res);
        let warning; let liststaff; let listroles; let branch;
        userDB.shops().then((result) => { liststaff = result;})
            .catch((err) => warning = err);
        rolesDB.all().then((result) => { listroles = result;})
            .catch((err) => warning = err);
        shopDB.all().then((result) => { branch = result;})
            .catch((err) => warning = err);
        setTimeout(() => {
            res.status(200).render('users/shops',{
                layout: 'users',
                title: 'Quản lý tài khoản Shop/Cửa hàng',
                csrfToken: req.csrfToken(),
                data:{liststaff,listroles,branch},
                user:req.session['user'],
            });
        }, 100);
    },
    shopsview:  function(req, res){
        var userid = req.params.id;
        userDB.shopsview(userid).then((result) =>{
            data =result;
            res.send(data);
        }).catch((err) => {
            res.redirect('back');
        });
    },
    updatedshops:  function(req, res){
        const userid = req.params.id;
        let data = req.body;
        userDB.updatedshops(data,userid).then((result) =>{
            res.redirect('/admin/users/shops');
        }).catch((err) => {
            res.redirect('/admin/users/shops');
        });
    },
    seachshop: function(req, res){
        authlogin.authstaff(req, res);
        const data = req.body;
        let warning; let liststaff; let listroles; let branch;
        userDB.seachshops(data).then((result) => { liststaff = result;})
            .catch((err) => warning = err);
        rolesDB.all().then((result) => { listroles = result;})
            .catch((err) => warning = err);
        shopDB.all().then((result) => { branch = result;})
            .catch((err) => warning = err);
        setTimeout(() => {
            res.status(200).render('users/shops',{
                layout: 'users',
                title: 'Quản lý tài khoản Shop/Cửa hàng',
                csrfToken: req.csrfToken(),
                data:{liststaff,listroles,branch},
                user:req.session['user'],
            });
        }, 100);
    },
    supplies:  function(req, res){
        authlogin.authstaff(req, res);
        let warning; let liststaff; let listroles; let branch;
        userDB.supplies().then((result) => { liststaff = result;})
            .catch((err) => warning = err);
        rolesDB.all().then((result) => { listroles = result;})
            .catch((err) => warning = err);
        supplyDB.all().then((result) => { branch = result;})
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
    suppliesview:  function(req, res){
        var userid = req.params.id;
        userDB.suppliesview(userid).then((result) =>{
            data =result;
            res.send(data);
        }).catch((err) => {
            res.redirect('back');
        });
    },
    updatedsupplies:  function(req, res){
        const userid = req.params.id;
        let data = req.body;
        userDB.updatedsupplies(data,userid).then((result) =>{
            res.redirect('/admin/users/supplies');
        }).catch((err) => {
            res.redirect('/admin/users/supplies');
        });
    },
    seachsupplies: function(req, res){
        authlogin.authstaff(req, res);
        const data = req.body;
        let warning; let liststaff; let listroles; let branch;
        userDB.seachsupplies(data).then((result) => { liststaff = result;})
            .catch((err) => warning = err);
        rolesDB.all().then((result) => { listroles = result;})
            .catch((err) => warning = err);
        supplyDB.all().then((result) => { branch = result;})
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
};