const var_dump = require('var_dump');
const userDB = require('../../models/UsersDB');
const rolesDB = require('../../models/RolesDB');
const helper = require('../../helpers/hepler');
const authlogin = require('../../helpers/auth');
module.exports = {
    all:  function(req, res){
        authlogin.authstaff(req, res);
        let warning; let listscustomers;
        userDB.customersusers().then((result) => { listscustomers = result;})
            .catch((err) => warning = err);
        setTimeout(() => {
            res.status(200).render('customers/all',{
                layout: 'customers',
                title: 'Quản lý tài khoản khách hàng online',
                csrfToken: req.csrfToken(),
                data:{listscustomers},
                user:req.session['user'],
            });
        }, 100);
    },
    created:  function(req, res){
        const staff = req.body;
        const  full_name = staff.full_name;
        const  phone = staff.phone;
        const  email = staff.email;
        const  birthday = staff.birthday;
        const  address = staff.address;
        const checkphone = helper.checkPhoneNumber(phone);
        if(checkphone==false){
            res.render("customers/all",{
                layout: 'customers',
                csrfToken: req.csrfToken(),
                data:{error:"Số điện thoại không hợp lệ"}});
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
            type_user:'4',
            verified:'1',
        }
        userDB.register(data).then((result) => {
            res.redirect('/admin/customers/all');
        }).catch((err) => {
            res.redirect('/admin/customers/all');
        });
    },
    updated:  function(req, res){
        const userid = req.params.id;
        let data = req.body;
        userDB.updatedcustomers(data,userid).then((result) =>{
            res.redirect('/admin/customers/all');
        }).catch((err) => {
            res.redirect('/admin/customers/all');
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
    seach: function(req, res){
        authlogin.authstaff(req, res);
        const data = req.body;
        let warning; let listscustomers;
        userDB.seachcustomers(data).then((result) => { listscustomers = result; })
            .catch((err) => warning = err);
        setTimeout(() => {
            res.status(200).render('customers/all', {
                layout: 'customers',
                title: 'Quản lý khách hàng online',
                csrfToken: req.csrfToken(),
                data:{listscustomers},
                user:req.session['user'],
            });
        }, 100);
    },
    delete:  function(req, res){
        var userid = req.params.id;
        userDB.deleteuser(userid).then((result) =>{
            res.redirect('back');
        }).catch((err) => {
            res.redirect('back');
        });
    },
};